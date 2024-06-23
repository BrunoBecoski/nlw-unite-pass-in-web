import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon, IconName } from './icon'

interface ButtonProps extends ComponentProps<'button'> {
  iconName?: IconName
  children?: ReactNode
  variant?: 'default' | 'success' | 'error'
}

export function Button({ variant = 'default', iconName, children, ...props }: ButtonProps) {
  let styles = []

  switch (variant) {
    case 'success': styles.push('bg-emerald-500 hover:bg-emerald-400'); break;
    case 'error': styles.push('bg-red-500 hover:bg-red-400'); break;
    default: styles.push('bg-orange-500 hover:bg-orange-400'); break;
  }

  return (
    <button
      className={`
        flex items-center justify-center gap-4 w-fit px-4 py-2 rounded-lg text-white transition
        ${styles.join(' ')}        
      `}
      {...props}
    >
      { iconName && <Icon name={iconName} className="w-4 h-4" /> }
      {children}
      { variant == 'success' && <Icon name="circle-check" className="w-4 h-4" /> }
      { variant == 'error' && <Icon name="circle-alert" className="w-4 h-4" /> }
    </button>
  )
}

interface IconButtonProps extends ComponentProps<'button'> {
  name: IconName
  border?: boolean
  disabled?: boolean
  variant?: 'default' | 'close'
  size?: 'base' | 'sm'
}

export function IconButton({ 
  name,
  border = false,
  disabled = false,
  variant = 'default',
  size = 'base',
  ...props
}: IconButtonProps) {
  
  let styles = []

  switch (variant) {
    case 'close':
      styles.push(`text-white 
        ${disabled ? '' : 'hover:text-red-500'}
      `)
      break;

    default:
      styles.push(`text-orange-500 
        ${disabled ? '' : 'hover:text-orange-600'}
      `)
      break;
  }

  return (
    <button
      className={twMerge(
        'bg-transparent flex items-center justify-center transition',
        styles.join(' '),
        border && 'border border-orange-500 hover:border-orange-600 rounded-md p-1 ',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      {...props}
    >
      <Icon 
        name={name}
        size={size}
      />
    </button>
  )
}