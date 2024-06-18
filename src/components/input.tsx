import { ComponentProps } from 'react'

import { Icon, IconName } from './icon'

interface InputProps extends ComponentProps<'input'> {
  id: string
  label?: string
  message?: string
  iconName?: IconName
}

export function Input({ 
  id,
  label,
  message,
  iconName,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-min">
      { label && <label htmlFor={id}>{label}</label> }

      <div 
        className={
          `px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3  focus-within:border-orange-500 text-emerald-500 focus-within:text-orange-500 
          ${message && 'border-red-500 text-red-500'}
        `}
      >
        <Icon 
          name={iconName} 
          size="sm"
        />

        <input
          id={id}
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          {...props}
        />

        <Icon 
          name="circle-alert"
          size="sm"
          color={message ? 'red' : 'transparent'}
        />
      </div>
      
      <span className="text-red-500 text-sm text-right">{message}</span>
    </div>
  )
}