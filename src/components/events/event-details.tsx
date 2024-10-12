import { useEffect, useState } from "react"
import dayjs from "dayjs"

import { useRouter } from "../../contexts/router-provider"
import { getEvent } from "../../fetches/events/get-event"
import { EventTypes } from "../../fetches"
import { Table } from "../table/table"
import { TableHeader } from "../table/table-header"
import { TableRow } from "../table/table-row"
import { TableCell } from "../table/table-cell"
import { MoreButton } from "../buttons/more-button"

export function EventDetails() {
  const [event, setEvent] = useState<EventTypes>({} as EventTypes )

  const { slug } = useRouter()

  useEffect(() => {
    async function fetch() {
      if (slug != undefined) {

        const { successfully, message, data } = await getEvent({ slug })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setEvent(data.event)
        } 
      }
    }

    fetch()
  }, [])

  return (
    <div>
      <h1>{event.title}</h1>
      <h2>{event.details}</h2>

      <div>
        De <p>{dayjs(event.startDate).format("DD [de] MMMM [de] YYYY")}</p>
        até <p>{dayjs(event.endDate).format("DD [de] MMMM [de] YYYY")}</p>
      </div>

      {event.attendees &&
        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }} >
                <input className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" type="checkbox" />
              </TableHeader>
              <TableHeader>Código</TableHeader>
              <TableHeader>Participante</TableHeader>
              <TableHeader>Eventos</TableHeader>
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
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {attendee.events}
                </TableCell>

                <TableCell>
                  <MoreButton 
                    code={attendee.code}
                    variant="attendee"
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