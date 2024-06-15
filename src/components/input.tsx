import { ComponentProps } from 'react'

import { Icon, IconName } from './icon'

interface InputProps extends ComponentProps<'input'> {
  id: string
  label?: string
  message?: string
  iconName?: IconName
  status?: 'default' | 'focus' | 'error' 
  handleSearch?: () => void
}

export function Input({ 
  id,
  label,
  message,
  iconName,
  status = 'default',
  ...props
}: InputProps) {
  
  return (
    <div className="flex flex-col gap-2 w-min outline-pink-500" >

      { label && <label htmlFor={id}>{label}</label> }

      <div 
        className="px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 has-[:focus]:border-orange-400"
      >
        <Icon name={iconName} size="sm" color="emerald" />

        <input
          id={id}
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          {...props}
        />

        { message && <Icon name="circle-alert" size="sm" color="red" /> }
      </div>
      
      <span className="text-red-500 text-sm text-right">{message}</span>
    </div>

  )
}