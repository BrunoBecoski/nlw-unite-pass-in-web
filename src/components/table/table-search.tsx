import { useState } from 'react'

import { Button } from '../button'
import { Input } from '../input'

interface TableSearchProps {
  title: string
  search?: string
  setSearch: (search: string) => void
}

export function TableSearch({ title, search = '', setSearch }: TableSearchProps) {
  const [value, setValue] = useState(search)

  function handleSearch() {
    setSearch(value)
  }

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      
      <Input
        iconName="search"
        id="search"
        placeholder={`Buscar ${title}...`}
        defaultValue={value}
        onChange={(event) => setValue(event.target.value)}
      />
      
      <Button onClick={handleSearch}>Pesquisar</Button>
    </div>
  )
} 