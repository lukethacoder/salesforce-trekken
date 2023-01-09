import { useEffect } from 'react'
import { Card } from '@app/components'
import { useBearStore } from '../state'

const OPTIONS = [
  {
    title: 'SFDX Login',
    to: '/token/sfdx',
    ariaLabel: 'SFDX Login. I have the sfdx cli installed',
    description: (
      <p className='text-sm'>
        I have the <code>sfdx</code> cli installed
      </p>
    ),
  },
  {
    title: 'Access Token',
    to: '/token/raw',
    ariaLabel: 'I have the an AccessToken and an Instance URL',
    description: <p className='text-sm'>I have an access token</p>,
  },
  // {
  //   title: 'Username / Password (Named Credentials)',
  //   to: '/token/username',
  //   ariaLabel: 'I have a setup named credentials',
  //   description: <p className='text-sm'>I have a username and password</p>,
  // },
]

export function Home() {
  const store = useBearStore()

  useEffect(() => {
    // reset access token and instance url when navigating back to the home page
    store.dispatch({
      type: 'reset',
      payload: '',
    })
  }, [])

  return (
    <div className='flex-1 flex flex-col items-center justify-center pt-8 pb-32 px-4 w-full max-w-[1024px] mx-auto'>
      <header className='w-full'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='mb-4'>Select Authentication Method</p>
      </header>
      <div className='w-full flex items-center justify-center'>
        <div
          className={`w-full max-w-[1024px] mx-auto flex md:grid grid-cols-2 flex-col gap-4`}
        >
          {OPTIONS.map((item) => (
            <div key={item.to} className='w-full flex items-stretch mx-auto'>
              <Card to={item.to} aria-label={item.ariaLabel}>
                <h3 className='text-lg'>{item.title}</h3>
                {item.description}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
