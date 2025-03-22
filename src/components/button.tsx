import { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

const button = tv({
  base: 'flex items-center justify-center gap-4 px-4 py-2 h-fit rounded-lg text-zinc-950 font-semibold disabled:cursor-not-allowed disabled:opacity-50 transition',

  variants: {
    variant: { 
      primary: 'bg-orange-400 enabled:hover:bg-orange-500',
      secondary: 'bg-zinc-400 enabled:hover:bg-zinc-500',
      tertiary: 'bg-emerald-400 enabled:hover:bg-emerald-500',
      icon: 'bg-transparent enabled:hover:text-orange-500 rounded-md p-1',
      iconBorder: 'text-white bg-zinc-950 border border-white/10 enabled:hover:border-orange-500 enabled:hover:text-orange-500 rounded-md p-1',
      chevron: 'text-white p-1.5 border border-white/10 bg-white/10 enabled:hover:border-orange-500 enabled:hover:text-orange-500',
      close: 'text-zinc-400 hover:text-white',
      checkInOn: 'text-[#9FF9CC] disabled:opacity-100 disabled:cursor-pointer',
      checkInOff: 'text-[#F48F56]',
    },

    size: {
      default: 'w-fit',
      full: 'w-full',
    },

    iconSize: {
      default: 'default',
      sm: 'sm',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
    iconSize: 'sm',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  iconName?: IconName
  children?: ReactNode
  isLoading?: boolean
}

export function Button({ iconName, children, variant, size, iconSize = 'sm', isLoading = false, ...props }: ButtonProps) {
  
  let disabled = props.disabled 

  if (isLoading) {
    disabled = isLoading
  }
  
  return (
    <button
      className={button({ variant, size })}
      {...props}
      disabled={disabled}
    > 
    {isLoading ? (
      <Icon 
        name="loader"
        animation="spin"
        color="white"
      />
    ) : (
        <>
          { iconName && <Icon name={iconName} size={iconSize} /> }
          {children}
        </>
      )
    }
    </button>
  )
}