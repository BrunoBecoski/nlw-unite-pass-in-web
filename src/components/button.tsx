import { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

const button = tv({
  base: 'flex items-center justify-center gap-4 px-4 py-2 rounded-lg text-white transition',

  variants: {
    variant: {
      primary: 'w-full bg-orange-500 hover:bg-orange-400',
      secondary: '',
      icon: 'bg-transparent text-white flex items-center justify-center transition hover:text-orange-500 rounded-md p-1',
      iconBorder: 'text-white flex items-center justify-center transition bg-zinc-950 border border-white/10 hover:border-orange-500 hover:text-orange-500 rounded-md p-1',
    },

    size: {
      default: 'w-fit'
    }
  },

  defaultVariants : {
    variant: 'primary',
    size: 'default',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  iconName?: IconName
  children?: ReactNode
}

export function Button({ iconName, children, variant, ...props }: ButtonProps) {
  return (
    <button
      className={button({ variant })}
      {...props}
    >
      { iconName && <Icon name={iconName} size="sm" /> }
      {children}
    </button>
  )
}