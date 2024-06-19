import { useState } from 'react'

import { SearchInput } from '../input'

interface TableSearchProps {
  title: string
  search?: string
  setSearch: (search: string) => void
}

export function TableSearch({ title, search = '', setSearch }: TableSearchProps) {
  const [input, setInput] = useState(search)

  function handleSearch() {
    setSearch(input)
  }

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      
      <SearchInput
        iconName="search"
        placeholder={`Buscar ${title}...`}
        handleSearch={handleSearch}
      />
    </div>
  )
} 