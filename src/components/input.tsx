import { useRef } from 'react'

import { IconButton } from './button'
import { Icon, IconName } from './icon'

interface FormInputProps {
  id: string
  label: string
  iconName: IconName
  message?: string
}

export function FormInput({ 
  id,
  label,
  message,
  iconName,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-min">
      <label htmlFor={id}>{label}</label>

      <div 
        className={
          `px-3 py-1.5 border border-zinc-700 rounded-lg text-sm flex items-center gap-3  focus-within:border-orange-400 text-emerald-400 focus-within:text-orange-400
          ${message && 'border-red-400 text-red-400'}
        `}
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
          color={message ? 'red' : 'transparent'}
        />
      </div>
      
      <span className="text-red-400 text-sm text-right">{message}</span>
    </div>
  )
}

interface SearchInputProps {
  iconName: IconName
  placeholder: string
  initialValue: string
  onSearch: (search: string) => void
  onErase: () => void
}

export function SearchInput({ 
  iconName, 
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
          iconName={iconName}
          onClick={handleSearch}
          title="Pesquisar"
        />

        <input
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          ref={searchRef}
          defaultValue={initialValue}
        />

        <IconButton
          onClick={handleEraser}
          iconName="eraser"
          title="Apagar"
        />
      </div>
    </div>
  )
}