import { Link, Outlet } from 'react-router-dom'
import { IconInfoCircle } from '@tabler/icons'
import { InfoModal, ThemeButton } from '@app/components'
import { useState } from 'react'

export function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <nav className='sticky z-50 top-0 flex justify-between px-2 py-2 border-b border-jumbo-100 dark:border-jumbo-600 bg-white dark:bg-jumbo-900'>
        <h1>Salesforce CMS Migration Tool</h1>

        <div className='flex'>
          <button
            type='button'
            className='mr-2 outline-none focus-visible:outline-primary rounded active:bg-jumbo-100 dark:active:bg-jumbo-800'
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <IconInfoCircle />
          </button>
          <ThemeButton />
        </div>
      </nav>

      <InfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <main>
        <Outlet />
      </main>
    </>
  )
}
