import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useRouter } from "../../contexts/router-provider";
import { AttendeeAndEventsType, getAttendee } from "../../fetches";

import { Table } from "../table/table";
import { TableHeader } from "../table/table-header";
import { TableCell } from "../table/table-cell";
import { TableRow } from "../table/table-row";
import { MoreButton } from "../buttons/more-button";

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeAndEventsType>({} as AttendeeAndEventsType)

  const { code } = useRouter()

  useEffect(() => {
    async function fetch() {
      if (code != undefined) {

        const { successfully, message, data } = await getAttendee({ code })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setAttendee(data.attendee)
        } 
      }
    }

    fetch()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{attendee.name}</h1>
          <p>{attendee.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Eventos</h2>

      {attendee.events &&
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
              <TableHeader>Confirmado</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </tr>
          </thead>

          <tbody>
            {attendee.events.map((event) => {
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
                    {event.checkIn ? 'Sim' : 'Não'}

                  </TableCell>

                  <TableCell>
                    <MoreButton 
                      slug={event.slug}
                      variant="event"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </tbody>
        </Table>
      }
    </div>
  )
}