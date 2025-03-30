import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useRouter } from '../../contexts/router-provider'
import {
  AttendeeTypes,
  checkInEventAttendee,
  deleteAttendee,
  deleteEventAttendee,
  getAttendee,
  updateAttendeeCode,
  getAttendeeEvents,
  AttendeeEventsTypes
} from '../../fetches'

import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableCell } from '../table/table-cell'
import { TableRow } from '../table/table-row'
import { Button } from '../button'
import { TableSearch } from '../table/table-search'
import { TableFoot } from '../table/table-foot'
import { UpdateAttendee } from './update-attendee'
import { AddEvent } from './add-event'
import { Icon } from '../icon'

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeTypes>({} as AttendeeTypes)
  const [attendeeEvents, setAttendeeEvents] = useState<AttendeeEventsTypes[]>([] as AttendeeEventsTypes[])
  const [attendeeEventsTotal, setAttendeeEventsTotal] = useState(0)
  const [attendeeCheckInTotal, setAttendeeCheckInTotal] = useState(0)
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

      fetchAttendeeEvents()
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

    if (response == false) {
      return
    }

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
          fetchAttendeeEvents()
          changePageIndex(1)
          changeSearch('')
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
      const slugs = attendeeEvents.map(event => isCheckArray.includes(event.id) && event.slug)

      slugs.forEach(async (slug) => {
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
            fetchAttendeeEvents()
            changePageIndex(1)
            changeSearch('')
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
        setAttendeeEventsTotal(data.eventsTotal)
        setAttendeeCheckInTotal(data.checkInTotal)
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
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-10">
              <h1 className="text-5xl font-bold italic">{attendee.name}</h1>
            </div>
            
            <Button variant="icon" title="Copiar código" onClick={() => navigator.clipboard.writeText(attendee.code)}>{attendee.code}</Button>
          </div>

          <div className="space-y-4">
            <Button onClick={handleDelete} variant="icon">Deletar evento</Button>
            <Button onClick={handleUpdateAttendeeCode}>Gera novo código</Button>
          </div>
        </div>

        <p className="text-xl">{attendee.email}</p>

        <div className="flex gap-8 my-4 text-lg">
          <span>Eventos {attendeeEventsTotal}</span>
          <span>Check-in {attendeeCheckInTotal}/{attendeeEventsTotal}</span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-12">
        <TableSearch
          title="eventos"
          search={search}
          setSearch={changeSearch}
        />

        <div className="flex gap-4">
          <AddEvent code={attendee.code} fetchAttendeeEvents={fetchAttendeeEvents} />
          <Button onClick={() => setUpdateAttendeeIsOpen(true)}>Editar participante</Button>
        </div>
      </div>

      {isCheck &&
        <div className="flex gap-8 items-center">
          <p className="font-semibold text-lg">O que deseja fazer com os {isCheckArray.length} eventos selecionados?</p>

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
            <TableHeader>Título</TableHeader>
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
                      <span className="font-semibold text-white">{event.title}</span>
                    </TableCell>

                    <TableCell>
                      {dayjs(event.startDate).format('DD/MM/YY')}
                    </TableCell>

                    <TableCell>
                      {dayjs(event.endDate).format('DD/MM/YY')}
                    </TableCell>

                    <TableCell>
                      {event.checkIn ? (
                        <button className="text-green" disabled>
                          <Icon name="circle-check"/>
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