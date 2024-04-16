import { ChangeEvent, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Event {
  id: string,
  slug: string,
  title: string,
  details: string,
  attendees: number,
  maximumAttendees: number,
  startDate: string,
  endDate: string,
  virtualEvent: boolean,
  physicalEvent: boolean,
  checkInAfterStart: boolean
}

export function EventList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }

    return ''
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })
  
  const [total, setTotal] = useState(0)
  const [events, setEvents] = useState<Event[]>([])

  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    const url = new URL(`http://localhost:3333/events`)

    url.searchParams.set('pageIndex', String(page - 1))

    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setEvents(data.events)
        setTotal(data.total)
      })
  }, [page, search])


  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('search', search)

    window.history.pushState({}, '', url)

    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    
    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }
  
  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2 xl font-bold">Participantes</h1>
      
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 has-[:focus]:border-orange-400">
          <Search className="size-4 text-emerald-300" />
          <input 
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participante..."
            onChange={onSearchInputChanged}
            value={search}
          />
        </div>
      </div>

      <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }} >
                <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
              </TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Duração</TableHeader>
              <TableHeader>Online / Presencial</TableHeader>
              <TableHeader>Vagas</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => {
              return (
              <TableRow key={event.id}>
                <TableCell>
                  <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{event.title}</span>
                    <span>{event.slug}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {dayjs(event.startDate).format('DD/MM/YY')}
                  {' - '}
                  {dayjs(event.endDate).format('DD/MM/YY')}
                </TableCell>
                <TableCell>
                  {event.virtualEvent ? 'Sim' : 'Não'} 
                  {' / '}
                  {event.physicalEvent ? 'Sim' : 'Não'}
                </TableCell>
                <TableCell>
                  {event.attendees}
                  {' / '}
                  {event.maximumAttendees}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
              )
            })}
          </tbody>

          <tfoot>
            <tr>
              <TableCell colSpan={3}>
                Mostrando {events.length} de {total} itens
              </TableCell>
              <TableCell className="text-right" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>Página {page} de {totalPages}</span>

                  <div className="flex gap-1.5">
                    <IconButton 
                      title="Ir para a primeira página"
                      onClick={goToFirstPage}  
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="size-4" />
                    </IconButton>

                    <IconButton 
                      onClick={goToPreviousPage}
                      disabled={page === 1}
                      title="Ir para a página anterior"
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={goToNextPage}
                      title="Ir para a próxima página"
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>

                    <IconButton 
                      onClick={goToLastPage}
                      disabled={page === totalPages}
                      title="Ir para a última página"
                    >
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
      </Table>
    </div>
  )
}  