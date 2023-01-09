import { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import { IconX } from '@tabler/icons'
import { Button } from '../button'

export function TableSettingsModal({
  children,
  className,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode
  className?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <Dialog
      className='relative z-50'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='w-full max-h-screen overflow-auto p-4'>
          <Dialog.Panel className='z-10 p-8 lg:p-12 relative w-full mx-auto max-w-screen-lg rounded bg-white dark:bg-jumbo-800'>
            <Dialog.Title className='text-2xl mb-4 font-bold'>
              Table Settings
            </Dialog.Title>

            {children}

            <Button
              type='tertiary'
              ariaLabel='Close table settings'
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
