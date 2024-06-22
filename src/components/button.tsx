import { ComponentProps, ReactNode } from 'react'

import { Icon, IconName } from './icon'

interface ButtonProps extends ComponentProps<'button'> {
  iconName?: IconName
  children?: ReactNode
  variant?: 'default'
}

export function Button({ variant = 'default', iconName, children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-orange-500 flex items-center justify-center gap-4 w-fit px-4 py-2 text-white rounded-lg"
      {...props}
    >
      { iconName && <Icon name={iconName} className="text-white w-4 h-4" /> }
      {children}
    </button>
  )
}

interface IconButtonProps extends ComponentProps<'button'> {
  name: IconName
  variant?: 'default' | 'close'
}

export function IconButton({ name, variant = 'default', ...props }: IconButtonProps) {
  
  let styles = []

  switch (variant) {
    case 'close':
      styles.push('text-white hover:text-red-400')
      break;

    default:
      styles.push('text-emerald-400 hover:text-orange-400')
      break;
  }

  return (
    <button
      className={`
        bg-transparent flex items-center justify-center
        ${styles.join(' ')}
      `}
      {...props}
    >
      <Icon 
        name={name}
        size="sm"
      />
    </button>
  )
}