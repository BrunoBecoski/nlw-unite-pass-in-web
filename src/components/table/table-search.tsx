import { FormEvent } from 'react'

import { Button } from '../button'
import { Input } from '../input'

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
      
      <Input
        iconName="search"
        name="search"
        placeholder={`Buscar ${title}...`}
        defaultValue={search}
      />
      
      <Button type="submit">Pesquisar</Button>
    </form>
  )
} 