import { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

const button = tv({
  base: 'flex items-center justify-center gap-4 px-4 py-2 h-fit rounded-lg text-zinc-950 font-semibold disabled:cursor-not-allowed disabled:opacity-50 transition',

  variants: {
    variant: { 
      default: 'bg-orange enabled:hover:bg-orange/80',
      icon: 'text-white enabled:hover:text-orange',
      border: 'text-white bg-zinc-950 border border-white/10 enable:hover:border-orange hover:text-orange rounded-md p-1',
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
    variant: 'default',
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