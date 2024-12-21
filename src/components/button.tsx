import { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

const button = tv({
  base: 'flex items-center justify-center gap-4 px-4 py-2 rounded-lg text-white disabled:cursor-not-allowed disabled:opacity-50 transition',

  variants: {
    variant: {
      primary: 'bg-orange-500 enabled:hover:bg-orange-400',
      secondary: 'bg-zinc-500 enabled:hover:bg-zinc-400',
      icon: 'bg-transparent hover:text-orange-500 rounded-md p-1',
      iconBorder: 'bg-zinc-950 border border-white/10 enabled:hover:border-orange-500 enabled:hover:text-orange-500 rounded-md p-1',
    },

    size: {
      default: 'w-fit',
      full: 'w-full',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  iconName?: IconName
  children?: ReactNode
  isLoading?: boolean
}

export function Button({ iconName, children, variant, size, isLoading = false, ...props }: ButtonProps) {
  return (
    <button
      className={button({ variant, size })}
      {...props}
      disabled={isLoading}
    > 
    {isLoading ? (
      <Icon 
        name="loader"
        animation="spin"
        color="white"
      />
    ) : (
        <>
          { iconName && <Icon name={iconName} size="sm"/> }
          {children}
        </>
      )
    }
    </button>
  )
}