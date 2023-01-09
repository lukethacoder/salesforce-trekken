import { IconChevronLeft } from '@tabler/icons'

export function BackButton() {
  return (
    <button
      aria-label='Go back'
      title='Go back'
      type='button'
      className='h-5 w-5 flex items-center justify-center rounded border-none outline-none hover:text-primary focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary'
      onClick={() => history.back()}
    >
      <IconChevronLeft />
    </button>
  )
}
