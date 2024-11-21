import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useRouter } from "../../contexts/router-provider";
import { AttendeeAndEventsType, getAttendee } from "../../fetches";
import { checkInEventAttendee } from "../../fetches/eventAttendee/checkIn-eventAttendee";

import { Table } from "../table/table";
import { TableHeader } from "../table/table-header";
import { TableCell } from "../table/table-cell";
import { TableRow } from "../table/table-row";
import { Button } from "../button";
import { TableSearch } from "../table/table-search";
import { TableFoot } from "../table/table-foot";
import { deleteAttendee } from "../../fetches/attendees/delete-attendee";

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeAndEventsType>({} as AttendeeAndEventsType)

  const { code, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  async function handleCheckIn(eventId: string) {
    const { successfully, message } = await checkInEventAttendee({
      attendeeId: attendee.id,
      eventId,
    })

    if (successfully == false) {
      alert(message)
    }    
  }

  async function handleDelete() {
    if (confirm(`Deletar participante ${attendee.name}`) == true) {
      const { successfully, message } = await deleteAttendee({ id: attendee.id })
      
      if (successfully == false) {
        alert(message)
      }
      
      if (successfully == true) {
        alert(message)
        changeRoute({ route: 'attendees' })
      }
    }
  }

  useEffect(() => {
    async function fetch() {
      if (code != undefined) {

        const { successfully, message, data } = await getAttendee({ code, pageIndex, search })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setAttendee(data.attendee)
        } 
      }
    }

    fetch()
  }, [pageIndex, search])

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-10">
              <h1 className="text-5xl font-bold italic">{attendee.name}</h1>
              <Button title="Copiar" iconName="copy" onClick={() => navigator.clipboard.writeText(attendee.code)}> {attendee.code}</Button>
            </div>
            <p>{attendee.email}</p>
          </div>

          <Button onClick={handleDelete} iconName="trash" variant="secondary">Deletar participante</Button>
        </div>
      </div>

      {
        attendee.events?.length >= 1 ? (
          <>
            <TableSearch
              title="Eventos"
              search={search}
              setSearch={changeSearch}
            />

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
                          <input 
                            className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" 
                            type="checkbox"
                            checked={event.checkIn}
                            onChange={() => event.checkIn === false && handleCheckIn(event.id)}
                          />
                        </TableCell>

                        <TableCell>
                          <Button
                            onClick={() => changeRoute({ route: 'event', slug: event.slug })}
                            iconName="eye"
                            variant="iconBorder"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </tbody>

                <TableFoot
                  length={attendee.events.length}
                  total={attendee.total}
                  pageIndex={pageIndex}
                  setPageIndex={changePageIndex}
                />
              </Table>
            }
          </>
        ) : (
          <h1 className="text-2xl font-bold">Nenhum evento do participante</h1>
        )
      }
    </div>
  )
}