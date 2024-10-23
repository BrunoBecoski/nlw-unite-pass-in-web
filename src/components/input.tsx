import { Component, useRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { IconButton } from './buttons/icon-button'
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

interface InputProps extends Component<'input'>, VariantProps<typeof input> {
  id: string
  label: string
  iconName: IconName
  message?: string
}

export function FormInput({ 
  id,
  label,
  iconName,
  variant,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-min">
      <label htmlFor={id}>{label}</label>

      <div className={input({ variant })}>
        <Icon 
          name={iconName} 
          size="sm"
        />

        <input
          id={id}
          name={id}
          className="bg-transparent text-white flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
        />
      </div>
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