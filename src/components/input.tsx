import { ComponentProps } from 'react'

import { Icon, IconName } from './icon'

interface InputProps extends ComponentProps<'input'> {
  id: string
  label?: string
  message?: string
  iconName?: IconName
  handleSearch?: () => void
  handleErase?: () => void
  setValue: (value: string) => void
  value: string
}

export function Input({ 
  id,
  label,
  message,
  iconName,
  handleSearch,
  handleErase,
  value,
  setValue,
  ...props
}: InputProps) {
  
  function submitSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (handleSearch) {
      if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        handleSearch()
      }
    }
  }
  
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-2 w-min"

    >
      {label}
      <div 
        className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 has-[:focus]:border-orange-400"
      >
        <Icon name={iconName} size="sm" color="emerald" />

        <input
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          id={id}
          onChange={(event) => setValue(event.target.value)}
          {...props}
          onKeyDown={submitSearch}
          value={value}
        />

        { message && <Icon name="circle-alert" size="sm" color="red" /> }
      </div>
      
      <span className="text-red-500 text-sm text-right">{message}</span>
    </label>
  )
}