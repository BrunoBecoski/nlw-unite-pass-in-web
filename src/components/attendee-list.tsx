import { useEffect, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

// import { attendees } from '../data/attendees'
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

interface Attendee {
  id: string
  name: string
  email:string
  createdAt: string
  checkedInAt: string | null
}

const eventId = 'cb9108f2-8d99-4d30-bfa1-bb6e3bb41da0'

export function AttendeeList() { 
  const { pageIndex, search } = useUrl()
  const { getEventAttendees } = new Api()

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendee[]>([])

  useEffect(() => {
    async function fetch() {
      const data = await getEventAttendees({ eventId, pageIndex, search })
      setAttendees(data.attendees)
      setTotal(data.total)
    }

    fetch()
  }, [pageIndex, search])

  return (
    <div className="flex flex-col gap-4">
      <TableSearch
        title="participantes"
      />

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }} >
              <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee) => {
            return (
            <TableRow key={attendee.id}>
              <TableCell>
                <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {dayjs().to(attendee.createdAt)}
              </TableCell>
              <TableCell >
                {attendee.checkedInAt === null
                  ? <span className="text-zinc-400">Não fez check-in</span>
                  : dayjs().to(attendee.checkedInAt)
                }
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
          length={attendees.length}
          total={total}
        />
      </Table>
    </div>
  )
}  