export function Loader() {
  return (
    <span className='absolute top-0 right-0 w-full h-full bg-jumbo-40 dark:bg-jumbo-900 flex items-center justify-center'>
      <span className='text-jumbo-50'>
        <div className='loader'>
          <svg viewBox='0 0 80 80'>
            <rect x='8' y='8' width='64' height='64'></rect>
          </svg>
        </div>
      </span>
    </span>
  )
}
