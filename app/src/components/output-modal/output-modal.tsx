import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { invoke } from '@tauri-apps/api'
import { open } from '@tauri-apps/api/dialog'
import toast from 'react-hot-toast'

import { Button } from '@app/components'
import { useBearStore } from '../../state'
import { Dialog } from '@headlessui/react'
import { IconX } from '@tabler/icons'

export function OutputModal({
  className,
  isOpen,
  setIsOpen,
  onIsLoading,
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onIsLoading: (isLoading: boolean) => void
}) {
  const [includeImages, setIncludeImages] = useState(false)
  const store = useBearStore()
  const params = useParams()
  const navigate = useNavigate()

  const saveToFile = async (filePath: string) => {
    onIsLoading(true)
    const { channelId } = params
    const toastId = toast.loading('Creating zip file(s)')

    try {
      await invoke('zip_content', {
        channelId,
        baseUrl: store.instanceUrl,
        accessToken: store.accessToken,
        exportPath: filePath,
        content: store.content,
        images: includeImages
          ? store.contentImages.map((item) => ({
              ...item,
              body: {
                ...item.body,
                altText: item.body.altText?.value || '',
              },
            }))
          : [],
      })

      navigate('/success')

      toast.success('Successfully created zip file(s)', {
        id: toastId,
      })
    } catch (error) {
      console.error('Error creating zip file ', error)
      toast.error('Error creating zip file', {
        id: toastId,
      })
    } finally {
      onIsLoading(false)
    }
  }

  const handleDownloadContentFile = async () => {
    const filePath = await open({
      title: 'Select output folder',
      directory: true,
      multiple: false,
    })

    if (filePath) {
      await saveToFile(filePath as string)
      store.dispatch({ type: 'setOutputFolder', payload: filePath as string })
    } else {
      toast.error('No output path set')
    }
  }

  return (
    <Dialog
      className='relative z-50'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='w-full max-h-screen overflow-auto p-4'>
          <Dialog.Panel className='z-10 p-8 lg:p-10 relative w-full mx-auto max-w-screen-sm rounded bg-white dark:bg-jumbo-800'>
            <Dialog.Title className='text-2xl mb-4 font-bold'>
              Output
            </Dialog.Title>

            {store.rowSelection && (
              <p className='mb-4'>
                Exporting {Object.keys(store.rowSelection).length} CMS content
                items
              </p>
            )}

            <label className='cursor-pointer select-none'>
              <input
                type='checkbox'
                checked={includeImages}
                onChange={() => setIncludeImages(!includeImages)}
                className='table-checkbox mr-2 mb-1'
              />
              Include Images
            </label>

            <div className='w-full flex justify-end'>
              <Button
                type='primary'
                ariaLabel='Choose a folder for the CMS export'
                onClick={handleDownloadContentFile}
              >
                Select output folder
              </Button>
            </div>

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
