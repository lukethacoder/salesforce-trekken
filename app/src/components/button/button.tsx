import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface IButton {
  children: ReactNode
  ariaLabel: string
  type: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  buttonType?: 'button' | 'submit' | 'reset' | undefined
  label?: string
  className?: string
  link?: string
  innerRef?: any
  [key: string]: any
}

const CLASSES_BY_TYPE: {
  [key: string]: { button: string }
} = {
  primary: {
    button:
      'bg-primary hover:bg-primary-600 text-white active:bg-primary-700 focus-visible:bg-primary focus-visible:outline-primary',
  },
  secondary: {
    button: '',
  },
  tertiary: {
    button:
      'bg-transparent text-jumbo-800 dark:text-white active:bg-jumbo-100 dark:active:bg-jumbo-900 focus-visible:outline-primary',
  },
}

const SIZE_CLASSES: { [key: string]: string } = {
  small: 'min-w-5 min-h-5',
  medium: 'min-w-7 min-h-7',
}

export function Button({
  children,
  ariaLabel,
  type = 'primary',
  buttonType = 'button',
  label,
  icon,
  iconPosition = 'left',
  className,
  size,
  link,
  innerRef,
  ...props
}: IButton) {
  const _size = size || 'medium'
  const classes = CLASSES_BY_TYPE[type]
  const globalButtonClasses = `${SIZE_CLASSES[_size]} rounded border border-transparent px-4 py-2 text-sm font-medium text-center focus:outline-none whitespace-nowrap`

  return link ? (
    <Link
      to={link}
      aria-label={ariaLabel}
      className={`button ${className ? className : ''} ${globalButtonClasses} ${
        classes.button
      }`}
      {...props}
      {...(innerRef ? { ref: innerRef } : {})}
    >
      {children}
    </Link>
  ) : buttonType === 'submit' ? (
    <input
      aria-label={ariaLabel}
      className={`${className ? className : ''} ${globalButtonClasses} ${
        classes.button
      }`}
      type={buttonType}
      {...props}
      {...(innerRef ? { ref: innerRef } : {})}
    />
  ) : (
    <button
      aria-label={ariaLabel}
      type={buttonType}
      className={`${className ? className : ''} ${globalButtonClasses} ${
        classes.button
      }`}
      {...props}
      {...(innerRef ? { ref: innerRef } : {})}
    >
      {children}
    </button>
  )
}
