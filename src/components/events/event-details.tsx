import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useRouter } from '../../contexts/router-provider'
import { 
  checkInEventAttendee,
  deleteEvent,
  deleteEventAttendee,
  EventAttendeesTypes,
  EventTypes,
  getEvent,
  getEventAttendees,
} from '../../fetches'

import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableRow } from '../table/table-row'
import { TableCell } from '../table/table-cell'
import { Button } from '../button'
import { TableSearch } from '../table/table-search'
import { TableFoot } from '../table/table-foot'
import { AddAttendee } from './add-attendee'
import { UpdateEvent } from './update-event'
import { Icon } from '../icon'

export function EventDetails() {
  const [event, setEvent] = useState<EventTypes>({} as EventTypes)
  const [eventAttendees, setEventAttendees] = useState<EventAttendeesTypes[]>([] as EventAttendeesTypes[])
  const [eventAttendeesTotal, setEventAttendeesTotal] = useState(0)
  const [eventCheckInTotal, setEventsCheckInTotal] = useState(0)
  const [isCheck, setIsCheck] = useState(false)
  const [isCheckArray, setIsCheckArray] = useState<string[]>([])
  const [updateEventIsOpen, setUpdateEventIsOpen] = useState(false)

  const { slug, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  async function handleCheckIn(attendeeId: string) {
    const response = confirm('Confirmar participante no evento?')

    if (response == true) {
      const { successfully, message } = await checkInEventAttendee({
        attendeeId,
        eventId: event.id,
      })

      if (successfully == false) {
        alert(message)
      }
      
      fetchEventAttendees()
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

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const checked = e.target.checked

    if (name == 'checkbox') {
      let newIsCheckArray: string[] = []

      if (checked == true) {
         newIsCheckArray = eventAttendees.map(attendee => attendee.id)
      }

      setIsCheckArray(newIsCheckArray)
      setIsCheck(checked)

      return
    }

    const idCheck = isCheckArray.includes(name)

    let newIsCheckArray: string[] = []

    if (idCheck == false) {
      newIsCheckArray = [...isCheckArray, name]
    }

    if (idCheck == true) {
      newIsCheckArray = isCheckArray.filter(id => id != name)
    }

    setIsCheckArray(newIsCheckArray)

    if (newIsCheckArray.length == 0) {
      setIsCheck(false)
    } else {
      setIsCheck(true)
    }
  }

  async function handleCheckAll() {
    const response = confirm('Confirmar todos os participantes marcados?')

    if (response == true) {
      isCheckArray.forEach(async (attendeeId)  => {
        const { successfully, message } = await checkInEventAttendee({
          attendeeId,
          eventId: event.id,
        })
    
        if (successfully == false) {
          alert(message)
        }

        if (successfully == true) {
          setIsCheck(false) 
          setIsCheckArray([])
          fetchEventAttendees()
        }
      })
    }
  }

  async function handleDeleteAll() {
    const response = confirm('Remover todos os participantes marcados?')

    if (response == false || slug == undefined ) {
      return
    }

    if (response == true) {
      isCheckArray.forEach(async (attendeeId)  => {
        const code = eventAttendees.find(attendee => attendee.id == attendeeId)?.code

        if (code) {
          const { successfully, message } = await deleteEventAttendee({
            slug,
            code,
          })

          if (successfully == false) {
            alert(message)
          }
  
          if (successfully == true) {
            setIsCheck(false) 
            setIsCheckArray([])
            fetchEventAttendees()
          }
        }
      })
    }
  }

  async function fetchEvent() {
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

  async function fetchEventAttendees() {
    if (slug != undefined) {
      const { successfully, message, data } = await getEventAttendees({ slug, pageIndex, search })

      if (successfully == false) {
        alert(message)
      }

      if (successfully == true && data != undefined) {
        setEventAttendees(data.attendees)
        setEventAttendeesTotal(data.attendeesTotal)
        setEventsCheckInTotal(data.checkInTotal)
      }
    }
  }

  useEffect(() => {
    setIsCheck(false) 
    setIsCheckArray([])
    fetchEventAttendees()
  }, [pageIndex, search])
  
  useEffect(() => {
    fetchEvent()
    fetchEventAttendees()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-10">
              <h1 className="text-5xl font-bold italic">{event.title}</h1>
           
              <div className="text-2xl">
                <span className="italic">{dayjs(event.startDate).format("DD/MM/YYYY")}</span>
                <span> - </span>
                <span className="italic">{dayjs(event.endDate).format("DD/MM/YYYY")}</span>
              </div>
            </div>

            <Button variant="icon" title="Copiar slug" onClick={() => navigator.clipboard.writeText(event.slug)}>{event.slug}</Button>
          </div>

          <Button onClick={handleDelete} variant="icon">Deletar evento</Button>
        </div>

        <p className="text-xl">{event.details}</p>

        <div className="flex gap-8 my-4 text-lg">
          <span>Participantes {eventAttendeesTotal}/{event.maximumAttendees}</span>
          <span>Check-in {eventCheckInTotal}/{eventAttendeesTotal}</span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-12">
        <TableSearch
          title="participantes"
          search={search}
          setSearch={changeSearch}
        />

        <div className="flex gap-4">
          <AddAttendee slug={event.slug} fetchEvent={fetchEvent} />
          <Button onClick={() => setUpdateEventIsOpen(true)}>Editar evento</Button>
        </div>
      </div>
      
      {isCheck &&
        <div className="flex gap-8 items-center">
          <p className="font-semibold text-lg">O que deseja fazer com os participantes selecionados?</p>

          <Button onClick={handleCheckAll}>
            Check-in
          </Button>

          <Button onClick={handleDeleteAll}>
            Remover
          </Button>
        </div>
      }

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }} >
              <input
                name="checkbox"
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange" 
                checked={isCheck}
                onChange={handleCheck}
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        { eventAttendees?.length >= 1 && (
          <>
            <tbody>
              {eventAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input
                      className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange"
                      type="checkbox"
                      name={attendee.id}
                      onChange={handleCheck} 
                      checked={isCheckArray.includes(attendee.id)}
                    />
                  </TableCell>

                  <TableCell>
                    {attendee.code}
                  </TableCell>

                  <TableCell>
                    <span className="font-semibold text-white">{attendee.name}</span>
                  </TableCell>

                  <TableCell>
                    {attendee.email}
                  </TableCell>

                  <TableCell>
                    {attendee.checkIn ? (
                        <button className="text-green" disabled>
                          <Icon name="circle-check" />
                        </button>
                      ) : (
                        <button className="text-orange hover:text-orange/80" title="Fazer Check-in" onClick={() => handleCheckIn(attendee.id)}>
                          <Icon name="circle" />
                        </button>
                      )
                    }
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => changeRoute({ route: 'attendee', code: attendee.code })}
                        iconName="ellipsis"
                        variant="border"
                        />
                    </div>
                  </TableCell>
                </TableRow>
                )
              )}
            </tbody>
            
            <TableFoot
              length={eventAttendees.length}
              total={eventAttendeesTotal}
              pageIndex={pageIndex}
              setPageIndex={changePageIndex}
            />
          </>
        )}
      </Table>

      <UpdateEvent
        isOpen={updateEventIsOpen}
        setIsOpen={setUpdateEventIsOpen}
        event={event}
        setEvent={setEvent}
      />
    </div>
  )
}