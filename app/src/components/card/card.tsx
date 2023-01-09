import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Card({
  children,
  to,
  title,
  onClick,
}: {
  children: ReactNode
  to?: string
  title?: string
  onClick?: () => void
}) {
  return onClick && !to ? (
    <button
      className='w-full text-left border-2 border-jumbo-150 dark:border-jumbo-400 p-4 rounded bg-transparent hover:bg-jumbo-25 dark:hover:bg-jumbo-800 hover:border-primary dark:hover:border-primary focus:border-primary dark:focus:border-primary focus:outline focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  ) : to ? (
    <Link
      to={to}
      title={title}
      className='w-full text-left border-2 border-jumbo-150 dark:border-jumbo-400 p-4 rounded bg-transparent hover:bg-jumbo-25 dark:hover:bg-jumbo-800 hover:border-primary dark:hover:border-primary focus:border-primary dark:focus:border-primary focus:outline focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
    >
      {children}
    </Link>
  ) : null
}
