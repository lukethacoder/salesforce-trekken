import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'
import { toast } from 'react-hot-toast'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { IconTestPipe } from '@tabler/icons'

import { BackButton, Card, ErrorMessage, Loader } from '@app/components'
import { SfdxDisplay, Org } from '../types'
import { useBearStore } from '../state'
import { delay } from '../utils'

dayjs.extend(customParseFormat)

export function SfdxLogin() {
  const store = useBearStore()
  let navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingOrgData, setIsLoadingOrgData] = useState(false)
  const [orgs, setOrgs] = useState<Org[]>([])
  const [orgsFiltered, setOrgsFiltered] = useState<Org[]>([])
  const [orgSearch, setOrgSearch] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    const toastId = toast.loading('Loading your SFDX authenticated orgs')

    ;(async () => {
      await fetchSfdxOrgs(toastId)
    })()

    // if the user jumps back before we resolve things
    return () => {
      toast.dismiss(toastId)
    }
  }, [])

  useEffect(() => {
    setOrgsFiltered(
      orgs.filter(
        (item) =>
          item.instanceUrl.includes(orgSearch) ||
          item.username.includes(orgSearch)
      )
    )
  }, [orgSearch, orgs])

  async function fetchSfdxOrgs(toastId: string) {
    await delay(1000)
    try {
      const response: Org[] = await invoke('sfdx_orgs_all')
      const _orgs = response.map((item) => ({
        ...item,
        date: dayjs(
          item.instanceApiVersionLastRetrieved,
          'DD/MM/YYYY'
        ).valueOf(),
      }))

      _orgs.sort((a, b) => b.date - a.date)
      setOrgs(_orgs)

      toast.success('Fetched orgs', { id: toastId })
    } catch (error) {
      console.error('Error fetching orgs ', error)
      toast.error('Error fetching orgs', { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  async function sfdxDisplayForUsername(username: string) {
    setIsLoadingOrgData(true)
    const toastId = toast.loading('Validating org connection')

    try {
      const sfdxDisplay: SfdxDisplay = await invoke('sfdx_display', {
        username,
      })

      if (
        sfdxDisplay.connectedStatus !== 'Connected' &&
        sfdxDisplay.status !== 'Active'
      ) {
        throw Error(
          `Org has invalid connection status of ${sfdxDisplay.connectedStatus}`
        )
      }

      store.dispatch({
        type: 'setAccessToken',
        payload: sfdxDisplay.accessToken,
      })
      store.dispatch({
        type: 'setInstanceUrl',
        payload: sfdxDisplay.instanceUrl,
      })

      toast.dismiss(toastId)

      // success - navigate onwards
      navigate(`/channel/${encodeURIComponent(sfdxDisplay.instanceUrl)}`)
    } catch (error) {
      console.error('Error verifying sfdx login ', {
        typeof: typeof error,
        error,
      })

      let errorMessageString: string = 'Error validating connection'

      if (typeof error === 'object') {
        if ((error as any)?.message) {
          errorMessageString = (error as any).message
        }
      } else if (typeof error === 'string') {
        try {
          const parsedError = JSON.parse(error as string)
          if (parsedError.message) {
            errorMessageString = parsedError.message
          }
        } catch (jsonError) {
          // not a JSON error
          errorMessageString = 'Error fetching org data'
        }
      }

      setErrorMessage(errorMessageString)

      toast.error(errorMessage || 'Error authenticating org', { id: toastId })
    } finally {
      setIsLoadingOrgData(false)
    }
  }

  return (
    <div className='w-full max-w-[1024px] mx-auto'>
      {isLoadingOrgData ? (
        <div className='z-10 top-0 left-0 absolute h-full w-full'>
          <Loader />
        </div>
      ) : (
        <>
          <header className='sticky top-[40px] px-4 pt-4 pb-6 bg-white dark:bg-jumbo-900'>
            <div className='mb-4'>
              <BackButton />
            </div>

            <h1 className='text-3xl font-bold'>SFDX Orgs</h1>

            {!isLoading &&
              (orgsFiltered.length > 0 || orgSearch.length !== 0) && (
                <>
                  <p className='mb-4 text-jumbo-700 dark:text-jumbo-200'>
                    {!isLoading && 'Select an org for export'}
                  </p>

                  <input
                    value={orgSearch}
                    onChange={(e) => setOrgSearch(e.target.value)}
                    placeholder='Search by Username or Instance URL...'
                    className='bg-transparent p-2 mt-2 w-full border-2 border-jumbo-150 dark:border-jumbo-400 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
                  />
                </>
              )}

            {errorMessage && (
              <span className='w-full block mt-2'>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </span>
            )}

            {!isLoading &&
              orgsFiltered.length === 0 &&
              orgSearch.length === 0 && (
                <span className='w-full block mt-2'>
                  <ErrorMessage>
                    No authenticated orgs found. Please authenticate an org
                    before running
                  </ErrorMessage>
                </span>
              )}
          </header>

          <div className='px-4 pb-2 mt-1'>
            {isLoading ? (
              <ul className='flex flex-col gap-2'>
                {[...Array(6).keys()].map((item) => (
                  <li key={item} className='skeleton rounded w-full h-16'></li>
                ))}
              </ul>
            ) : errorMessage && !orgsFiltered ? (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            ) : (
              <ul className='flex flex-col gap-2'>
                {orgsFiltered.map((item, key) => (
                  <li
                    key={`${key}_${item.instanceUrl}`}
                    className='w-full flex'
                  >
                    <Card
                      onClick={() => sfdxDisplayForUsername(item.username)}
                      aria-label={`Select instance ${item.instanceUrl}`}
                      title={item.instanceUrl}
                    >
                      <h3 className='text-base flex items-start font-bold'>
                        {item.instanceUrl
                          .replace('https://', '')
                          .replace('.my.salesforce.com', '')}
                        {item.loginUrl.includes('test') ? (
                          <span title='Is sandbox instance'>
                            <IconTestPipe className='mt-[2px] ml-1 h-4 w-4 text-primary' />
                          </span>
                        ) : (
                          ''
                        )}
                      </h3>
                      <small className='text-sm text-jumbo-300'>
                        Last retrieved: {item.instanceApiVersionLastRetrieved} -{' '}
                        {item.username}
                      </small>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}
