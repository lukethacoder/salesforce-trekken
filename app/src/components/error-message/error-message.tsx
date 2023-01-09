import { ReactNode } from 'react'

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className='relative border-l-4 border-red-600 text-red-600 dark:text-white py-2 px-3 rounded overflow-hidden'>
      <span className='relative z-10'>{children}</span>
      <span className='z-0 absolute h-full w-full bg-red-300 dark:bg-red-600 opacity-20 left-0 top-0'></span>
    </p>
  )
}
