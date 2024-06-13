import { useState } from 'react'

import { Input } from '../input'

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
  
  function handleErase() {
    setInput('')
    setSearch('')
  }

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      
      <div>       
        <Input
          iconName="search"
          id="attendee"
          placeholder={`Buscar ${title}...`}
          setValue={setInput}
          value={input}
          handleSearch={handleSearch}
          handleErase={handleErase}
        />
      </div>
    </div>
  )
} 