import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconButton } from './button'
import { Icon, IconName } from './icon'

interface FormInputProps {
  id: string
  label: string
  iconName: IconName
  message?: string
  variant?: 'default' | 'success' | 'error'
}

export function FormInput({ 
  id,
  label,
  message,
  iconName,
  variant = 'default',
}: FormInputProps) {

  let styles = ''

  switch (variant) {
    case 'success': styles = 'border-emerald-200/50 focus-within:border-emerald-500 text-emerald-500 focus-within:text-emerald-600'; break;
    case 'error': styles = 'border-red-200/50 focus-within:border-red-500 text-red-500 focus-within:text-red-600'; break;
    default: styles = 'border-orange-200/50 focus-within:border-orange-500 text-orange-500 focus-within:text-orange-600'; break;
  }
  return (
    <div className="flex flex-col gap-2 w-min">
      <label htmlFor={id}>{label}</label>

      <div 
        className={twMerge(
          'px-3 py-1.5 border rounded-lg text-sm flex items-center gap-3',
          styles
        )}
      >
        <Icon 
          name={iconName} 
          size="sm"
        />

        <input
          id={id}
          name={id}
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
        />

        <Icon 
          name="circle-alert"
          size="sm"
          color={variant == 'error' ? 'red' : 'transparent'}
        />
      </div>
      
      <span className="text-red-400 text-sm text-right">{message}</span>
    </div>
  )
}

interface SearchInputProps {
  placeholder: string
  initialValue: string
  onSearch: (search: string) => void
  onErase: () => void
}

export function SearchInput({ 
  placeholder,
  initialValue,
  onSearch,
  onErase,
}: SearchInputProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  function handleSearch() {
    if (searchRef.current) {
      onSearch(searchRef.current.value)
    }
  }

  function handleEraser() {
    if (searchRef.current) {
      searchRef.current.value = ''
      
      onErase()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col gap-2 w-min">
      <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3  focus-within:border-emerald-500">
        <IconButton
          name="search"
          size="sm"
          title="Pesquisar"
          onClick={handleSearch}
        />

        <input
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          ref={searchRef}
          defaultValue={initialValue}
        />

        <IconButton
          name="eraser"
          size="sm"
          title="Apagar"
          onClick={handleEraser}
        />
      </div>
    </div>
  )
}