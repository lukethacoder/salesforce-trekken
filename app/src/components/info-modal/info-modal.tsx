import { useEffect, useState } from 'react'
import { arch, type, version } from '@tauri-apps/api/os'
import { getVersion, getTauriVersion } from '@tauri-apps/api/app'
import { Dialog } from '@headlessui/react'
import { IconBrandGithub, IconX } from '@tabler/icons'

import { Button } from '../button'
import SfTrekkenLogo from '../../assets/logo.png'

export function InfoModal({
  className,
  isOpen,
  setIsOpen,
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const [versionName, setVersionName] = useState('')
  const [archName, setArchName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [tauriVersion, setTauriVersion] = useState('')
  const [appVersion, setAppVersion] = useState('')

  useEffect(() => {
    ;(async () => {
      setArchName(await arch())
      setVersionName(await version())
      setTauriVersion(await getTauriVersion())
      setAppVersion(await getVersion())
      setTypeName(await type())
    })()
  }, [])

  return (
    <Dialog
      className='relative z-50'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <div className='w-full max-h-screen overflow-auto p-4'>
          <Dialog.Panel className='z-10 p-8 lg:p-12 mx-auto relative w-full max-w-2xl rounded bg-white dark:bg-jumbo-800'>
            <Dialog.Title className='text-2xl mb-4 font-bold flex flex-col'>
              <img className='w-16 h-16' src={SfTrekkenLogo} />
              <span className='mt-1'>Salesforce Trekken</span>
            </Dialog.Title>

            <div className='text-sm mb-4 flex'>
              <a
                href='https://github.com/lukethacoder/salesforce-trekken'
                target='_blank'
                className='bg-transparent text-jumbo-800 dark:text-white rounded active:bg-jumbo-100 dark:active:bg-jumbo-900 outline-none focus-visible:outline-primary'
              >
                <span className='flex items-center justify-center h-8 w-8'>
                  <IconBrandGithub />
                </span>
              </a>
            </div>

            <div className='text-sm'>
              <p>Beta {appVersion}</p>
              <p>Tauri v{tauriVersion}</p>
              <p>
                {typeName} {archName} {versionName}
              </p>

              <p className='my-2'>
                Found an issue or want to request a feature?{' '}
                <a
                  className='underline'
                  href='https://github.com/lukethacoder/salesforce-trekken/issues'
                  target='_blank'
                >
                  Github
                </a>{' '}
                or flick me a message
              </p>

              <p className='mt-2'>
                Built by{' '}
                <a
                  className='underline'
                  href='https://lukesecomb.digital'
                  target='_blank'
                >
                  luke secomb
                </a>
                .
              </p>
            </div>

            <Button
              type='tertiary'
              ariaLabel='Close modal'
              onClick={() => setIsOpen(false)}
              className='flex items-center justify-center h-8 w-8 absolute right-4 top-4'
            >
              <span className='flex items-center justify-center h-8 w-8'>
                <IconX />
              </span>
            </Button>
          </Dialog.Panel>
        </div>
        <span className='absolute h-full w-full opacity-75 bg-jumbo-150 dark:bg-jumbo-900'></span>
      </div>
    </Dialog>
  )
}
