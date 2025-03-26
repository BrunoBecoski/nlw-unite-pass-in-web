import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useRouter } from '../../contexts/router-provider'
import {
  AttendeeTypes,
  checkInEventAttendee,
  deleteAttendee,
  deleteEventAttendee,
  EventTypes,
  getAttendee,
  updateAttendeeCode
} from '../../fetches'

import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableCell } from '../table/table-cell'
import { TableRow } from '../table/table-row'
import { Button } from '../button'
import { TableSearch } from '../table/table-search'
import { TableFoot } from '../table/table-foot'
import { getAttendeeEvents } from '../../fetches/attendees/get-attendee-events'
import { UpdateAttendee } from './update-attendee'

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeTypes>({} as AttendeeTypes)
  const [attendeeEvents, setAttendeeEvents] = useState<EventTypes[]>([] as EventTypes[])
  const [attendeeEventsTotal, setAttendeeEventsTotal] = useState(0)
  const [isCheck, setIsCheck] = useState(false)
  const [isCheckArray, setIsCheckArray] = useState<string[]>([])
  const [updateAttendeeIsOpen, setUpdateAttendeeIsOpen] = useState(false)


  const { code, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  async function handleCheckIn(eventId: string) {
    const response = confirm('Confirmar participante no evento?')

    if (response == true) {
      const { successfully, message } = await checkInEventAttendee({
        attendeeId: attendee.id,
        eventId,
      })
  
      if (successfully == false) {
        alert(message)
      }

      fetchAttendee()
    }
  }

  async function handleUpdateAttendeeCode() {
    const { successfully, message, code } = await updateAttendeeCode({ id: attendee.id })

    if (successfully == false) {
      alert(message)
    }

    if (successfully == true &&  code != undefined) {
      alert(message)

      setAttendee({ ...attendee, code })

      changeRoute({ route: "attendee", code })
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

  // async function handleRegisterAttendeeEvent(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()S

  //   const form = new FormData(e.currentTarget)
  //   const slug = form.get('slug')?.toString()

  //   if (slug == null || code == undefined) {
  //     return
  //   }

  //   const { successfully, message } = await createEventAttendee({ code, slug })

  //   if (successfully == false) {
  //     alert(message)
  //   }

  //   if (successfully == true) {
  //     alert(message)
  //     setShowRegister(false)
  //     fetchAttendee()
  //   }
  // }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const checked = e.target.checked

    if (name == 'checkbox') {
      let newIsCheckArray: string[] = []

      if (checked == true) {
        newIsCheckArray = attendeeEvents.map(event => event.id)
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
    const response = confirm('Confirmar todos os eventos marcados?')

    if (response == true) {
      isCheckArray.forEach(async (eventId) => {
        const { successfully, message } = await checkInEventAttendee({
          eventId,
          attendeeId: attendee.id
        })
        
        if (successfully == false) {
          alert(message)
        }

        if (successfully == true) {
          setIsCheck(false)
          setIsCheckArray([])
          fetchAttendee()
        }
      })
    }
  }

  async function handleDeleteAll() {
    const response = confirm('Remover todos os eventos marcados?')

    if (response == false || code == undefined ) {
      return
    }

    if (response == true) {
      isCheckArray.forEach(async (eventId) => {

        const slug = attendeeEvents.find(event => event.id == eventId)?.slug

        if (slug) {
          const { successfully, message } = await deleteEventAttendee({
            slug,
            code
          })
        
          if (successfully == false) {
            alert(message)
          }

          if (successfully == true) {
            setIsCheck(false)
            setIsCheckArray([])
            fetchAttendee()
          }
        }
      })
    }
  }

  async function fetchAttendee() {
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

  async function fetchAttendeeEvents() {
    if (code != undefined) {
      const { successfully, message, data } = await getAttendeeEvents({ code, pageIndex, search })

      if (successfully == false) {
        alert(message)
      }
      
      if (successfully == true && data != undefined) {
        setAttendeeEvents(data.events)
        setAttendeeEventsTotal(data.total)
      }
    }
  }

  useEffect(() => {
    setIsCheck(false) 
    setIsCheckArray([])
    fetchAttendeeEvents()
  }, [pageIndex, search])


  useEffect(() => {
    fetchAttendee()
    fetchAttendeeEvents()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex items-start justify-between w-full">
          <div>
            <div className="flex items-center gap-10">
              <h1 className="text-5xl font-bold italic">{attendee.name}</h1>
              <Button title="Copiar" iconName="copy" onClick={() => navigator.clipboard.writeText(attendee.code)}> {attendee.code}</Button>
            </div>
            <p>{attendee.email}</p>
          </div>

          <div className="flex flex-col items-end gap-4 ">
            <Button onClick={handleUpdateAttendeeCode} iconName="repeat">Gera novo código</Button>
            <Button onClick={handleDelete} iconName="trash">Deletar participante</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-12">
        <TableSearch
          title="eventos"
          search={search}
          setSearch={changeSearch}
        />

        <div className="flex gap-4">
          <Button onClick={() => setUpdateAttendeeIsOpen(true)}>Editar participante</Button>
        </div>
      </div>

      {isCheck &&
        <div className="flex gap-8 items-center">
          <p className="font-semibold text-lg">O que deseja fazer com os eventos selecionados?</p>

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
                type="checkbox"
                name="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange"
                checked={isCheck}
                onChange={handleCheck}
              />
            </TableHeader>
            <TableHeader>Slug</TableHeader>
            <TableHeader>Evento</TableHeader>
            <TableHeader>Data de Início</TableHeader>
            <TableHeader>Data de Fim</TableHeader>
            <TableHeader>Check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        { attendeeEvents?.length >= 1 && (
          <>
            <tbody>
              {attendeeEvents.map((event) => {
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <input 
                        className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange"
                        type="checkbox"
                        name={event.id}
                        onChange={handleCheck}
                        checked={isCheckArray.includes(event.id)}
                      />
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
                      {event.checkIn ? (
                          <Button iconName="square-check" disabled>Confirmado</Button>
                        ) : (
                          <Button iconName="square" onClick={() => handleCheckIn(attendee.id)}>Confirmar</Button>
                        )
                      }
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          onClick={() => changeRoute({ route: 'event', slug: event.slug })}
                          iconName="ellipsis"
                          variant="border"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </tbody>

            <TableFoot
              length={attendeeEvents.length}
              total={attendeeEventsTotal}
              pageIndex={pageIndex}
              setPageIndex={changePageIndex}
            />
          </>
        )}
      </Table>

      <UpdateAttendee 
        isOpen={updateAttendeeIsOpen}
        setIsOpen={setUpdateAttendeeIsOpen}
        attendee={attendee}
        setAttendee={setAttendee}
      />
    </div>
  )
}