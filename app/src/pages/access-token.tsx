import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'

import { BackButton, Button, ErrorMessage, Loader } from '@app/components'
import { useBearStore } from '../state'

export function AccessToken() {
  const store = useBearStore()
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleVerifyAccessToken = async () => {
    if (!accessToken) {
      setErrorMessage('Please enter an Access Token')
      return
    }
    if (!baseUrl) {
      setErrorMessage('Please enter an Instance URL')
      return
    }

    // regex to check for https and the my.salesforce.com part of the url
    const regex = /^(https?:\/\/)?(\S+\.(my.salesforce.com)(\/\S+)?)/
    if (!regex.test(baseUrl)) {
      setErrorMessage(
        'Please enter a valid Instance URL. Must include "https" and "my.salesforce.com".'
      )
      return
    }

    // hit the server after we've client side validated
    setIsLoading(true)
    const toastId = toast.loading(
      'Validating authentication token and instance URL'
    )

    try {
      await invoke('info', {
        accessToken,
        baseUrl,
      })

      store.dispatch({
        type: 'setAccessToken',
        payload: accessToken,
      })
      store.dispatch({
        type: 'setInstanceUrl',
        payload: baseUrl,
      })

      toast.success('Successfully validated', {
        id: toastId,
      })

      // success - navigate onwards
      navigate(`/channel/${encodeURIComponent(baseUrl)}`)
    } catch (error) {
      toast.error('Error validating details', {
        id: toastId,
      })

      let errorMessageString: string = error as string

      if (typeof error === 'string') {
        try {
          const parsedError = JSON.parse(error)
          if (parsedError[0].message) {
            errorMessageString = parsedError[0].message
          }
        } catch (parseError) {
          // no-op
        }
      }

      if (errorMessageString.includes('No such host')) {
        errorMessageString = 'Instance URL does not exist'
      }
      setErrorMessage(errorMessageString)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      await handleVerifyAccessToken()
    }
  }

  return (
    <div className='w-full max-w-[420px] mx-auto flex flex-col justify-center'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className='px-2 pt-4 pb-6'>
            <div className='mb-4'>
              <BackButton />
            </div>

            <h1 className='text-3xl font-bold'>Access Token</h1>
            <p className='mb-4'>Verify your access details</p>
          </header>

          <div className='flex flex-col px-2 pb-2 mt-1'>
            <label className='mb-4'>
              <span className='flex mb-1'>Access Token</span>

              <input
                value={accessToken}
                onChange={(e) => {
                  setAccessToken(e.target.value)

                  // if error, reset on input change
                  if (errorMessage) {
                    setErrorMessage('')
                  }
                }}
                onKeyUp={handleKeyUp}
                placeholder='ACCESS_TOKEN'
                className='w-full bg-transparent border-2 border-jumbo-150 dark:border-jumbo-400 px-2 py-2 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
              />
            </label>

            <label className='mb-4'>
              <span className='flex mb-1'>Instance URL</span>
              <input
                value={baseUrl}
                type='url'
                onChange={(e) => {
                  setBaseUrl(e.target.value)

                  // if error, reset on input change
                  if (errorMessage) {
                    setErrorMessage('')
                  }
                }}
                onKeyUp={handleKeyUp}
                placeholder='https://INSTANCE_NAME.my.salesforce.com'
                className='w-full bg-transparent border-2 border-jumbo-150 dark:border-jumbo-400 px-2 py-2 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
              />
            </label>

            {errorMessage ? (
              <span className=''>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </span>
            ) : null}

            <Button
              type='primary'
              ariaLabel='Verify token and domain details'
              className='mt-6'
              onClick={handleVerifyAccessToken}
            >
              Verify
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
