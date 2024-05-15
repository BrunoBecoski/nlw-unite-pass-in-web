import { Search } from 'lucide-react'

interface TableSearchProps {
  title: string
  search: string
  setSearch: (search: string) => void
}

export function TableSearch({ title, search, setSearch }: TableSearchProps) {
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2 xl font-bold first-letter:uppercase">{title}</h1>
      <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 has-[:focus]:border-orange-400">
        <Search className="size-4 text-emerald-300" />
        
        <input
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          placeholder={`Buscar ${title}...`}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </div>
    </div>
  )
} 