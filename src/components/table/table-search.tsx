import { SearchInput } from '../input'

interface TableSearchProps {
  title: string
  search?: string
  setSearch: (search: string) => void
}

export function TableSearch({ title, search = '', setSearch }: TableSearchProps) {
  function handleSearch(search: string) {
    setSearch(search)
  }

  function handleErase() {
    setSearch('')
  }

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      
      <SearchInput
        placeholder={`Buscar ${title}...`}
        initialValue={search}
        onSearch={handleSearch}
        onErase={handleErase}
      />
    </div>
  )
} 