import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useRouter } from '../../contexts/router-provider'
import { EventTypes, getEvents } from '../../fetches'
import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableCell } from '../table/table-cell'
import { TableRow } from '../table/table-row'
import { TableFoot } from '../table/table-foot'
import { TableSearch } from '../table/table-search'
import { Button } from '../button'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function EventList() {
  const { changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  const [total, setTotal] = useState(0)
  const [events, setEvents] = useState<EventTypes[]>([])

  useEffect(() => {
    async function fetch() {
      const { successfully, message, data } = await getEvents({ pageIndex, search })
      
    if (successfully == false) {
      alert(message)
    }

    if (successfully == true && data != undefined) {
      setEvents(data.events)
      setTotal(data.total)
    } 
  }

    fetch()
  }, [pageIndex, search])

  return (
    <div className="flex flex-col gap-4">
      <TableSearch 
        title="eventos"
        search={search}
        setSearch={changeSearch}
      />

      {events.length === 0 
        ?
          <span>Nada encontrado com: <i>{search}</i></span>
        :
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <TableHeader style={{ width: 48 }} >
                  <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
                </TableHeader>
                <TableHeader>Slug</TableHeader>
                <TableHeader>Evento</TableHeader>
                <TableHeader>Começa</TableHeader>
                <TableHeader>Termina</TableHeader>
                <TableHeader>Participantes</TableHeader>
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
                    {event.slug}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{event.title}</span>
                      <span>{event.details}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {dayjs(event.startDate).format('DD/MM/YY')}
                  </TableCell>

                  <TableCell>
                    {dayjs(event.endDate).format('DD/MM/YY')}
                  </TableCell>

                  <TableCell>
                    {event.attendees} / {event.maximumAttendees}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => changeRoute({ route: 'event', slug: event.slug })}
                      iconName="ellipsis"
                      variant="icon"
                    />
                  </TableCell>
                </TableRow>
                )
              })}
            </tbody>
    
            <TableFoot
              length={events.length}
              total={total}
              pageIndex={pageIndex}
              setPageIndex={changePageIndex}
            />
          </Table>
      }
    </div>
  )
}