import { FormEvent } from 'react'
import { Search } from 'lucide-react'

interface TableSearchProps {
  title: string
  search?: string
  setSearch: (search: string) => void
}

export function TableSearch({ title, search = '', setSearch }: TableSearchProps) {

  function handleSearch(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const search = form.get('search')?.toString()

    if (search != undefined) {
      setSearch(search)
    }
  }

  return (
    <form className="flex gap-3 items-center" onSubmit={handleSearch}>
      <h1 className="text-2xl font-bold first-letter:uppercase">{title}</h1>
      
      <div className="px-3 py-2 border border-white/10 rounded-lg text-sm flex items-center gap-3 text-emerald-400 focus-within:border-orange-500">
        <button type="submit" title="Pesquisar" className="hover:text-orange-500">
          <Search size={18} />
        </button>

        <input
          className="bg-transparent text-white outline-none border-0 p-0 text-sm focus:ring-0 w-44" 
          name="search"
          placeholder={`Buscar ${title}...`}
          defaultValue={search}
        />
      </div>
      
    </form>
  )
} 