import { ComponentProps } from 'react'

import { Icon, IconName } from '../icon'
import { twMerge } from 'tailwind-merge'

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
  
  let styles = ''

  switch (variant) {
    case 'close':
      styles = `text-white 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}
      `
      break;

    default:
      styles = `text-orange-500 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-orange-600'}
      `
      break;
  }

  return (
    <button
      className={twMerge(
        'bg-transparent flex items-center justify-center transition',
        border && 'border border-orange-500 hover:border-orange-600 rounded-md p-1',
        styles,
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