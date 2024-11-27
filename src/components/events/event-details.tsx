import { FormEvent, useEffect, useState } from "react"
import dayjs from "dayjs"
import { z } from "zod"

import { useRouter } from "../../contexts/router-provider"
import { EventAndAttendeesType, getEvent } from "../../fetches"
import { checkInEventAttendee } from "../../fetches/eventAttendee/checkIn-eventAttendee"
import { deleteEvent } from "../../fetches/events/delete-event"
import { updateEvent } from "../../fetches/events/update-event"
import { registerEventAttendee } from "../../fetches/eventAttendee/register-eventAttendee"

import { Input, InputVariants } from "../input"
import { Table } from "../table/table"
import { TableHeader } from "../table/table-header"
import { TableRow } from "../table/table-row"
import { TableCell } from "../table/table-cell"
import { Button } from "../button"
import { TableSearch } from "../table/table-search"
import { TableFoot } from "../table/table-foot"

const schema = z.object({
  title: z.string({ message: 'Titulo obrigatório' }).min(4, { message: 'Mínimo 4 caracteres' }),
  details: z.string({ message: 'Detalhes obrigatório' }).min(4, { message: 'Mínimo 4 caracteres' }),
  maximumAttendees: z.number({ message: 'Máximos de participantes obrigatório' }),
  startDate: z.coerce.date({ message: 'Data de inicio obrigatório' }),
  endDate: z.coerce.date({ message: 'Data de fim obrigatório' }),
})

interface FormStatusProps {
  title: {
    message: string
    variant: InputVariants
  }
  details: {
    message: string
    variant: InputVariants
  }
  maximumAttendees: {
    message: string
    variant: InputVariants
  }
  startDate: {
    message: string
    variant: InputVariants
  }
  endDate: {
    message: string
    variant: InputVariants
  }
}

export function EventDetails() {
  const [event, setEvent] = useState<EventAndAttendeesType>({} as EventAndAttendeesType)
  const [showForm, setShowForm] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatusProps>({} as FormStatusProps)
  const [isLoading, setIsLoading] = useState(false)

  const { slug, changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  function handleShowForm() {
    setShowForm(!showForm)
  }

  function handleShowRegister() {
    setShowRegister(!showRegister)
  }

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

  function formValidation(form: FormData) {
    const title = form.get('title')
    const details = form.get('details')
    const maximumAttendees = Number(form.get('maximumAttendees'))
    const startDate = form.get('startDate')
    const endDate = form.get('endDate')

    const result = schema.safeParse({
      title,
      details,
      maximumAttendees,
      startDate,
      endDate,
    })

    if (result.success === false) {
      const { title, details, maximumAttendees, startDate, endDate } = result.error.format()

      setFormStatus({
        title:  {
          variant: title ? 'error' : 'success',
          message: title?._errors[0] ? title._errors[0] : 'Titulo valido',
        },
        details: { 
          variant: details ? 'error' : 'success',
          message: details?._errors[0] ? details._errors[0] : 'Detalhes valido',
        },
        maximumAttendees: { 
          variant: maximumAttendees ? 'error' : 'success',
          message: maximumAttendees?._errors[0] ? maximumAttendees._errors[0] : 'Máximos de participantes valido',
        },
        startDate: { 
          variant: startDate ? 'error' : 'success',
          message: startDate?._errors[0] ? startDate._errors[0] : 'Data de inicio valido',
        },
        endDate: { 
          variant: endDate ? 'error' : 'success',
          message: endDate?._errors[0] ? endDate._errors[0] : 'Data de fim valido',
        }
      })

    } else {
      return {
        title: result.data.title,
        details: result.data.details,
        maximumAttendees: result.data.maximumAttendees,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
      }
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true)

    e.preventDefault()
    
    setFormStatus({} as FormStatusProps)

    const form = new FormData(e.currentTarget)

    const validatedForm = formValidation(form)

    if (validatedForm === undefined) {
      setIsLoading(false)

      return
    }

    const { successfully, message, event: updatedEvent } = await updateEvent({
      id: event.id,
      title: validatedForm.title,
      details: validatedForm.details,
      maximumAttendees: validatedForm.maximumAttendees,
      startDate: validatedForm.startDate,
      endDate: validatedForm.endDate,
    })

    if (successfully == false || updatedEvent == undefined) {
      setIsLoading(false)
      alert(message)

      return
    }

    if (successfully === true) {
      setIsLoading(false)
      setEvent({...event, title: updatedEvent.title, details: updatedEvent.details, maximumAttendees: updatedEvent.maximumAttendees, startDate: updatedEvent.startDate, endDate: updatedEvent.endDate  })
      setShowForm(false)
      changeRoute({ route: 'event', slug: updatedEvent.slug })
      alert(message)

      return
    }
  }

  async function handleRegisterEventAttendee(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const code = form.get('code')?.toString()

    if (code == null || slug == undefined) {
      return
    }

    const { successfully, message } = await registerEventAttendee({ code, slug })

    if (successfully == false) {
      alert(message)
    }

    if (successfully == true) {
      alert(message)
      setShowRegister(false)
      fetchEvent()
    }
  }

  useEffect(() => {
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

        {
          showForm ? (
            <form  onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <Input
                name="title"
                label="Titulo"
                iconName="type"
                defaultValue={event.title}
                message={formStatus.title?.message}
                variant={formStatus.title?.variant}
              />
      
              <Input
                name="details"
                label="Detalhes"
                iconName="text"
                defaultValue={event.details}
                message={formStatus.details?.message}
                variant={formStatus.details?.variant}
              />
      
              <Input
                name="maximumAttendees"
                label="Máximos de participantes"
                iconName="users"
                defaultValue={event.maximumAttendees}
                message={formStatus.maximumAttendees?.message}
                variant={formStatus.maximumAttendees?.variant}
              />
      
              <Input 
                name="startDate"
                label="Data de inicio"
                iconName="calendar-days"
                type="date"
                defaultValue={event.startDate.split('T')[0]}
                message={formStatus.startDate?.message}
                variant={formStatus.startDate?.variant}
              />
      
              <Input
                name="endDate"
                label="Data de fim"
                iconName="calendar-days"
                type="date"
                defaultValue={event.endDate.split('T')[0]}
                message={formStatus.endDate?.message}
                variant={formStatus.endDate?.variant}
              />
      
              <Button
                type="submit"
                iconName="calendar-plus"
                variant="primary"
                size="full"
                isLoading={isLoading}
              >
                Atualizar evento
              </ Button>
            </form>
          ) : (
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
          )
        }

        <div className="flex flex-col items-end gap-4">
          <Button onClick={handleShowForm} iconName="pencil">Editar evento</Button>
          <Button onClick={handleDelete} variant="secondary" iconName="trash">Deletar evento</Button>
        </div>
      </div>
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

              <Button onClick={handleShowRegister}>Adicionar participante</Button>
            </div>

            {event.attendees &&
               showRegister ? (
                  <form onSubmit={handleRegisterEventAttendee} className="flex flex-col gap-2">
                    <Input name="code" label="Código do participante" />
                    <Button type="submit">Adicionar participante no evento</Button>
                  </form> 
              ) : (
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
              )
            }
          </>
        ) : ( 
          <>
            <h1 className="text-2xl font-bold">Nenhum participante no evento</h1>

            <form onSubmit={handleRegisterEventAttendee} className="flex flex-col gap-2">
              <Input name="code" label="Código do participante" />
              <Button type="submit">Adicionar participante no evento</Button>
            </form> 
          </>
        )
      }
    </div>
  )
}