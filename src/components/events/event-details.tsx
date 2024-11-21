import { useEffect, useState } from "react"
import dayjs from "dayjs"

import { useRouter } from "../../contexts/router-provider"
import { EventAndAttendeesType, getEvent } from "../../fetches"
import { checkInEventAttendee } from "../../fetches/eventAttendee/checkIn-eventAttendee"

import { Table } from "../table/table"
import { TableHeader } from "../table/table-header"
import { TableRow } from "../table/table-row"
import { TableCell } from "../table/table-cell"
import { Button } from "../button"
import { TableSearch } from "../table/table-search"
import { TableFoot } from "../table/table-foot"
import { deleteEvent } from "../../fetches/events/delete-event"

export function EventDetails() {
  const [event, setEvent] = useState<EventAndAttendeesType>({} as EventAndAttendeesType)

  const { slug, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  async function handleCheckIn(attendeeId: string) {
    const { successfully, message } = await checkInEventAttendee({
      attendeeId,
      eventId: event.id,
    })

    if (successfully == false) {
      alert(message)
    }    
  }

  async function handleDelete() {
    if (confirm(`Deletar evento ${event.title}`) == true) {
      const { successfully, message } = await deleteEvent({ id: event.id })
      
      if (successfully == false) {
        alert(message)
      }
  
      if (successfully == true) {
        alert(message)
        changeRoute({ route: 'events' })
      }
    }
  }

  useEffect(() => {
    async function fetch() {
      if (slug != undefined) {

        const { successfully, message, data } = await getEvent({ slug, pageIndex, search })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setEvent(data.event)
        } 
      }
    }

    fetch()
  }, [pageIndex, search])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center gap-10">
            <h1 className="text-5xl font-bold italic">{event.title}</h1>
            <Button title="Copiar" iconName="copy" onClick={() => navigator.clipboard.writeText(event.slug)}> {event.slug}</Button>
          </div>
          
          <span className="italic">{dayjs(event.startDate).format("DD/MM/YYYY")}</span>
          <span> - </span>
          <span className="italic">{dayjs(event.endDate).format("DD/MM/YYYY")}</span>
          
          <p className="text-lg">{event.details}</p>
        </div>

      <Button onClick={handleDelete} variant="secondary" iconName="trash">Deletar evento</Button>

      </div>
  
      <div className="flex flex-col gap-2 text-sm">
        <span>Participantes: {event.totalAttendees}</span>
        <span>Confirmado: {event.checkInAttendees}</span>
        <span>Máximo: {event.maximumAttendees}</span>
      </div>

      {
        event.attendees?.length >= 1 ? (
          <>
            <TableSearch
              title="participantes"
              search={search}
              setSearch={changeSearch}
            />

            {event.attendees &&
              <Table>
                <thead>
                  <tr className="border-b border-white/10">
                    <TableHeader style={{ width: 48 }} >
                      <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
                    </TableHeader>
                    <TableHeader>Código</TableHeader>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Confirmado</TableHeader>
                    <TableHeader style={{ width: 64 }}></TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {event.attendees.map((attendee) => {
                    return (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
                      </TableCell>

                      <TableCell>
                        {attendee.code}
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold text-white">{attendee.name}</span>
                      </TableCell>

                      <TableCell>
                        <span className="text-white">{attendee.email}</span>
                      </TableCell>

                      <TableCell>
                        <input 
                          className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" 
                          type="checkbox"
                          checked={attendee.checkIn}
                          onChange={() => attendee.checkIn === false && handleCheckIn(attendee.id)}
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => changeRoute({ route: 'attendee', code: attendee.code })}
                          iconName="eye"
                          variant="iconBorder"
                        />
                      </TableCell>
                    </TableRow>
                    )
                  })}
                </tbody>

                <TableFoot
                  length={event.attendees.length}
                  total={event.total}
                  pageIndex={pageIndex}
                  setPageIndex={changePageIndex}
                />
              </Table>
            }
          </>
        ) : ( 
         <h1 className="text-2xl font-bold">Nenhum participante do evento</h1>
        )
      }
    </div>
  )
}