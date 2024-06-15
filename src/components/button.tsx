import { ComponentProps, ReactNode } from 'react'

import { Icon, IconName } from './icon'

interface ButtonProps extends ComponentProps<'button'> {
  iconName?: IconName
  children?: ReactNode
  variant?: 'default' | 'icon'
}

export function Button({ variant = 'default', iconName, children, ...props }: ButtonProps) {
  
  if (variant === 'icon') {
    return (
      <button
        className="bg-transparent flex items-center justify-center"
        {...props}
      >
        <Icon name={iconName} />
      </button>

    )
  }

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