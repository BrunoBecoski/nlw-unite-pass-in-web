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
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p>{event.details}</p>
        </div>

        <Button onClick={() => {navigator.clipboard.writeText(event.slug)}} variant="primary">{event.slug}</Button>
      </div>

      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-semibold">Participantes</h2>

          <div className=" text-sm">
            <p>{event.checkInAttendees} confirmado</p>
            <p>{event.totalAttendees} total</p>
            <p>{event.maximumAttendees} máximo</p>
          </div>
        </div>


        <div className="text-lg font-semibold italic">
            <p>{dayjs(event.startDate).format("DD MMMM YYYY")}</p>
            <p>{dayjs(event.endDate).format("DD MMMM YYYY")}</p>
          </div>
      </div>

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
    </div>
  )
}