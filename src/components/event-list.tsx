import { useEffect, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useUrl } from '../contexts/url-provider'
import { Api } from '../api/api'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { TableFoot } from './table/table-foot'
import { TableSearch } from './table/table-search'

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
  const { pageIndex, search } = useUrl()
  const { getEvents } = new Api()

  const [total, setTotal] = useState(0)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetch() {
      const data = await getEvents({ pageIndex, search })
      setEvents(data.events)
      setTotal(data.total)
    }

    fetch()
  }, [pageIndex, search])

  return (
    <div className="flex flex-col gap-4">
      <TableSearch title="eventos" />

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

        <TableFoot
          length={events.length}
          total={total}
        />
      </Table>
    </div>
  )
}  