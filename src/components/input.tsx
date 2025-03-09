import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon, IconName } from './icon'

export type InputVariants = 'primary' | 'success' | 'error'

const input = tv({
  base: 'px-3 py-2 border rounded-lg text-sm flex items-center gap-3',

  variants: {
    variant: {
      primary: 'border-zinc-600 focus-within:border-orange-500 text-zinc-600 focus-within:text-orange-400',
      success: 'border-emerald-300 focus-within:border-emerald-500 text-emerald-300 focus-within:text-emerald-500',
      error: 'border-red-300 focus-within:border-red-500 text-red-300 focus-within:text-red-500',
    },
  },

  defaultVariants: {
    variant: 'primary',
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof input> {
  label?: string
  iconName?: IconName
  message?: string
}

export function Input({ 
  label,
  iconName,
  variant,
  message,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-min">
      { label && <label htmlFor={props.name}>{label}</label> }
      
      <div className={input({ variant })}>
        { iconName &&
          <label htmlFor={props.name}>
            <Icon 
              name={iconName} 
              size="sm"
            />
          </label>
        }

        { props.type === 'date'? (
          <input
            id={props.name}
            className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0 w-44" 
            min={String(new Date().toISOString().split("T")[0])}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            {...props}
          />
        ) : ( 
          <input
            id={props.name}
            className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            {...props}
          />
        )}
      </div>

      { message && <span className="text-white/80 text-xs text-right">{message}</span> }
    </div>
  )
}