import { ChangeEvent, useEffect, useState } from "react"
import dayjs from "dayjs"

import { useRouter } from "../../contexts/router-provider"
import { 
  checkInEventAttendee,
  deleteEvent,
  deleteEventAttendee,
  EventAndAttendeesType,
  getEvent,
} from "../../fetches"

import { Table } from "../table/table"
import { TableHeader } from "../table/table-header"
import { TableRow } from "../table/table-row"
import { TableCell } from "../table/table-cell"
import { Button } from "../button"
import { TableSearch } from "../table/table-search"
import { TableFoot } from "../table/table-foot"
import { AddAttendee } from "./add-attendee"
import { UpdateEvent } from "./update-event"


export function EventDetails() {
  const [event, setEvent] = useState<EventAndAttendeesType>({} as EventAndAttendeesType)
  const [showForm, setShowForm] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  const [isCheckArray, setIsCheckArray] = useState<string[]>([])
  const [updateEventIsOpen, setUpdateEventIsOpen] = useState(false)

  const { slug, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  function handleShowForm() {
    setShowForm(!showForm)
  }

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
      
      fetchEvent()
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
         newIsCheckArray = event.attendees.map(attendee => attendee.id)
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
          fetchEvent()
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
        const code = event.attendees.find(attendee => attendee.id == attendeeId)?.code

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
            fetchEvent()
          }
        }
      })
    }
  }

  useEffect(() => {
    setIsCheck(false) 
    setIsCheckArray([])
    fetchEvent()
  }, [pageIndex, search])
  
  async function fetchEvent() {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-10">
              <h1 className="text-5xl font-bold italic">{event.title}</h1>
              <Button title="Copiar" iconName="copy" onClick={() => navigator.clipboard.writeText(event.slug)}> {event.slug}</Button>
            </div>

            <div>
              <span className="italic">{dayjs(event.startDate).format("DD/MM/YYYY")}</span>
              <span> - </span>
              <span className="italic">{dayjs(event.endDate).format("DD/MM/YYYY")}</span>
            </div>
            
            <p className="text-lg">{event.details}</p>

            <div className="flex flex-col gap-1 text-sm">
              <span>Participantes: {event.totalAttendees}</span>
              <span>Confirmado: {event.checkInAttendees}</span>
              <span>Máximo: {event.maximumAttendees}</span>
            </div>
          </div>
      

        <div className="flex flex-col items-end gap-4">
          <Button onClick={handleShowForm} iconName="pencil">Editar evento</Button>
          <Button onClick={handleDelete} variant="secondary" iconName="trash">Deletar evento</Button>
        </div>
      </div>
    </div>

    <div className="flex justify-between">
      <AddAttendee slug={slug} fetchEvent={fetchEvent} />

      <Button onClick={() => setUpdateEventIsOpen(true)}>
        Atualizar evento
      </Button>
    </div>
      {
        event.attendees?.length >= 1 ? (
          <>
            <div className="flex justify-between">
              <TableSearch
                title="participantes"
                search={search}
                setSearch={changeSearch}
              />


            </div>

            {isCheck && 
              <div className="flex gap-8">
                <Button
                  iconName="square-check"
                  variant="primary"
                  onClick={handleCheckAll}
                >
                  Confirmar
                </Button>

                <Button
                  iconName="trash-2"
                  variant="primary"
                  onClick={handleDeleteAll}
                >
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
                          className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400" 
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

                  <tbody>
                    {event.attendees.map((attendee) => {
                      return (
                        <TableRow key={attendee.id}>
                          <TableCell>
                            <input
                              className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400"
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
                              <Button variant="checkInOn" iconName="circle-check" iconSize="default" disabled />
                            ) : (
                              <Button variant="checkInOff" iconSize="default" iconName="circle" onClick={() => handleCheckIn(attendee.id)} />
                            )
                          }
                          </TableCell>

                          <TableCell>
                            <div className="flex justify-center">
                              <Button
                                onClick={() => changeRoute({ route: 'attendee', code: attendee.code })}
                                iconName="ellipsis"
                                variant="iconBorder"
                              />
                            </div>
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
          </>
        ) : ( 
          <>
            <h1 className="text-2xl font-bold">Nenhum participante no evento</h1>

            <AddAttendee slug={slug} fetchEvent={fetchEvent} />
          </>
        )
      }

      <UpdateEvent isOpen={updateEventIsOpen}  setIsOpen={setUpdateEventIsOpen} event={event} setEvent={setEvent}/>
    </div>
  )
}