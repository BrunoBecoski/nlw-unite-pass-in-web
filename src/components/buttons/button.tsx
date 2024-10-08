import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon, IconName } from '../icon'

interface ButtonProps extends ComponentProps<'button'> {
  iconName?: IconName
  children?: ReactNode
  variant?: 'default' | 'confirm' | 'cancel'
}

export function Button({ variant = 'default', iconName, children, ...props }: ButtonProps) {
  
  let styles = ''

  switch (variant) {
    case 'confirm': styles = 'bg-emerald-500 hover:bg-emerald-400'; break;
    case 'cancel': styles = 'bg-red-500 hover:bg-red-400'; break;
    default: styles = 'bg-orange-500 hover:bg-orange-400'; break;
  }

  return (
    <button
      className={twMerge(
        'w-full flex items-center justify-center gap-4 px-4 py-2 rounded-lg text-white  transition',
        styles
      )}
      {...props}
    >
      { iconName && <Icon name={iconName} className="w-4 h-4" /> }
      {children}

      { variant == 'confirm' &&  <Icon name="circle-check" className="w-4 h-4" />}
      { variant == 'cancel' &&  <Icon name="circle-alert" className="w-4 h-4" />}
    </button>
  )
}