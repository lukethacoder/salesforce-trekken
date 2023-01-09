import { Button } from '@app/components'
import { invoke } from '@tauri-apps/api'
import { useBearStore } from '../state'

export function Success() {
  const store = useBearStore()

  const handleOpenOutputFolder = async () => {
    await invoke('show_in_folder', { path: store.outputFolder })
  }

  return (
    <div className='w-full max-w-[1024px] mx-auto'>
      <header className='mt-8 px-4'>
        <h1 className='text-3xl font-bold'>Success</h1>
        {store.rowSelection && (
          <p className='mb-4'>
            Successfully exported {Object.keys(store.rowSelection).length} CMS
            content items.
          </p>
        )}
      </header>

      <div className='flex items-center gap-4 px-4'>
        <Button
          type='primary'
          ariaLabel='Open the file explorer to the exported files directory'
          onClick={handleOpenOutputFolder}
        >
          Show in folder
        </Button>

        <p>or</p>

        <Button
          type='primary'
          ariaLabel='Start the export process again'
          link='/'
        >
          Start again
        </Button>
      </div>
    </div>
  )
}
