import { useState } from 'react'

const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

export function ThemeButton() {
  const [theme, setTheme] = useState<typeof THEME_DARK | typeof THEME_LIGHT>(
    document.documentElement.classList.contains(THEME_DARK)
      ? THEME_DARK
      : THEME_LIGHT
  )

  const handleSetTheme = () => {
    const newTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    setTheme(newTheme)

    localStorage.theme = newTheme

    if (
      localStorage.theme === THEME_DARK ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add(THEME_DARK)
    } else {
      document.documentElement.classList.remove(THEME_DARK)
    }
  }

  return (
    <button
      className='outline-none focus-visible:outline-primary rounded active:bg-jumbo-100 dark:active:bg-jumbo-800'
      onClick={handleSetTheme}
    >
      {theme === 'dark' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-slate-50'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z'></path>
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-sun'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <circle cx='12' cy='12' r='4'></circle>
          <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7'></path>
        </svg>
      )}
    </button>
  )
}
