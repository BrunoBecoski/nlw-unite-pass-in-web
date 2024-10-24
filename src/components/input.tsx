import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

export type InputVariants = 'default' | 'success' | 'error'

const input = tv({
  base: 'px-3 py-1.5 border rounded-lg text-sm flex items-center gap-3',

  variants: {
    variant: {
      primary: 'border-orange-200/50 focus-within:border-orange-500 text-orange-300 focus-within:text-orange-500',
      success: 'border-emerald-200/50 focus-within:border-emerald-500 text-emerald-300 focus-within:text-emerald-500',
      error: 'border-red-200/50 focus-within:border-red-500 text-red-300 focus-within:text-red-500',
    }
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof input> {
  id: string
  label?: string
  iconName: IconName
}

export function Input({ 
  label,
  iconName,
  variant,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-min">
      { label && <label htmlFor={props.id}>{label}</label> }
      
      <div className={input({ variant })}>
        <Icon 
          name={iconName} 
          size="sm"
        />

        <input
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          {...props}
        />
      </div>
    </div>
  )
}