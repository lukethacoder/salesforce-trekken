import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'

import { useBearStore } from '../state'
import { Channel as ChannelType } from '../types'
import { BackButton, Card, ErrorMessage } from '@app/components'
import { toast } from 'react-hot-toast'

export function Channel() {
  const store = useBearStore()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [channels, setChannels] = useState<ChannelType[]>([])
  const [channelsFiltered, setChannelsFiltered] = useState<ChannelType[]>([])
  const [channelSearch, setChannelSearch] = useState<string>('')

  useEffect(() => {
    fetchChannels()
  }, [params])

  useEffect(() => {
    setChannelsFiltered(
      channels.filter(
        (item) =>
          item.channelId.includes(channelSearch) ||
          item.channelName.includes(channelSearch)
      )
    )
  }, [channelSearch, channels])

  async function fetchChannels() {
    if (store.accessToken && store.instanceUrl) {
      const toastId = toast.loading('Fetching channels')

      try {
        const response: ChannelType[] = await invoke('channels_all', {
          accessToken: store.accessToken,
          baseUrl: store.instanceUrl,
        })

        setChannels(response)

        toast.success('Fetched channels', { id: toastId })
      } catch (error) {
        console.error('error fetching channels ', {
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
            } else if (parsedError[0]) {
              errorMessageString = parsedError[0].message
            } else {
              errorMessageString = 'Error fetching channel data'
            }
          } catch (jsonError) {
            // not a JSON error
            errorMessageString = 'Error fetching channel data'
          }
        }

        setErrorMessage(errorMessageString)
        toast.error(errorMessage || 'Error fetching channel data', {
          id: toastId,
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='w-full max-w-[1024px] mx-auto'>
      <header className='sticky top-[40px] px-4 pt-4 pb-6 bg-white dark:bg-jumbo-900'>
        <div className='mb-4'>
          <BackButton />
        </div>

        <h1 className='text-3xl font-bold'>Channels</h1>

        {!isLoading && channelsFiltered.length > 0 && (
          <>
            <p className='mb-4 text-jumbo-700 dark:text-jumbo-200'>
              Select a target channel
            </p>

            <input
              value={channelSearch}
              onChange={(e) => setChannelSearch(e.target.value)}
              placeholder='Search by Name or Channel Id...'
              className='bg-transparent p-2 mt-2 w-full border-2 border-jumbo-150 dark:border-jumbo-400 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
            />
          </>
        )}

        {!isLoading && channelsFiltered.length === 0 && (
          <span className='w-full block mt-2'>
            <ErrorMessage>No Channels found for the selected org</ErrorMessage>
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
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <ul className='flex flex-col gap-2'>
            {channelsFiltered.map((item) => (
              <li key={item.channelId} className='w-full flex'>
                <Card
                  to={`/content/${item.channelId}`}
                  aria-label={`Select channel ${item.channelName}`}
                >
                  <p>{item.channelName}</p>
                  <small>
                    {item.channelType} - {item.channelId}
                  </small>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
