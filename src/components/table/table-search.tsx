import { useState } from 'react'
import { Delete, Search } from 'lucide-react'

import { IconButton } from '../icon-button'

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

  function submitSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
      handleSearch()
    }
  }

  function deleteSearch() {
    setInput('')
    setSearch('')
  }
 
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 has-[:focus]:border-orange-400">
        <IconButton
          onClick={handleSearch}
          transparent={true}
          title="Pesquisar"
        >
          <Search className="size-4 text-emerald-300" />
        </IconButton>
        
        <input
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder={`Buscar ${title}...`}
          onChange={(event) => setInput(event.target.value)}
          value={input}
          onKeyDown={submitSearch}
        />

        {
          input != '' &&
            <IconButton
              onClick={deleteSearch}
              transparent={true}
              title="Apagar"
            >
              <Delete className="size-4 text-emerald-300" />
            </IconButton>
        }
      </div>
    </div>
  )
} 