import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import dayjs from "dayjs";

import { useRouter } from "../../contexts/router-provider";
import { AttendeeAndEventsType, getAttendee } from "../../fetches";
import { checkInEventAttendee } from "../../fetches/eventAttendee/checkIn-eventAttendee";
import { deleteAttendee } from "../../fetches/attendees/delete-attendee";
import { updateAttendeeCode } from "../../fetches/attendees/update-attendee-code";
import { updateAttendee } from "../../fetches/attendees/upodate-attendee";

import { Input, InputVariants } from "../input";
import { Table } from "../table/table";
import { TableHeader } from "../table/table-header";
import { TableCell } from "../table/table-cell";
import { TableRow } from "../table/table-row";
import { Button } from "../button";
import { TableSearch } from "../table/table-search";
import { TableFoot } from "../table/table-foot";

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

interface FormStatusProps {
  name: {
    message: string
    variant: InputVariants
  }
  email: {
    message: string
    variant: InputVariants
  }
}

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeAndEventsType>({} as AttendeeAndEventsType)
  const [showForm, setShowForm] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatusProps>({} as FormStatusProps)
  const [isLoading, setIsLoading] = useState(false)

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

  async function handleShowForm() {
    setShowForm(!showForm)
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

  function formValidation(form: FormData) {
    const name = form.get('name')
    const email = form.get('email')

    const result = schema.safeParse({
      name,
      email,
    })
    
    if (result.success == false) {
      const { name, email } = result.error.format()

      setFormStatus({
        name:  {
          variant: name ? 'error' : 'success',
          message: name?._errors[0] ? name._errors[0] : 'Nome valido',
        },
        email: { 
          variant: email ? 'error' : 'success',
          message: email?._errors[0] ? email._errors[0] : 'Email valido',
        }
      })
      
    } else {
      return {
        name: result.data.name,
        email: result.data.email,
      }
    }
  }
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()
    
    setFormStatus({} as FormStatusProps)

    const form = new FormData(event.currentTarget)
    const validatedForm = formValidation(form)

    if (validatedForm == undefined) {
      setIsLoading(false)
      
      return
    }

    const { successfully, message, attendee: updatedAttendee } = await updateAttendee({
      id: attendee.id,
      name: validatedForm.name,
      email: validatedForm.email,
    })

    if (successfully == false || updatedAttendee == undefined) {
      setIsLoading(false)
      alert(message)
      
      return
    }

    if (successfully == true)  {
      setIsLoading(false)
      setAttendee({ ...attendee, name: updatedAttendee.name,  email: updatedAttendee.email })
      setShowForm(false)
      alert(message)

      return
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

          {
            showForm ? (
              <form  onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <Input
                name="name"
                label="Nome"
                iconName="user"
                defaultValue={attendee.name}
                message={formStatus.name?.message}
                variant={formStatus.name?.variant}
              />
      
              <Input
                name="email"
                label="Email"
                iconName="mail"
                defaultValue={attendee.email}
                message={formStatus.email?.message}
                variant={formStatus.email?.variant}
              />
      
              <Button
                type="submit"
                variant="primary"
                size="full"
                isLoading={isLoading}
              >
                Atualizar participante
              </ Button>
            </form>
            ) : (
              <div>
                <div className="flex items-center gap-10">
                  <h1 className="text-5xl font-bold italic">{attendee.name}</h1>
                  <Button title="Copiar" iconName="copy" onClick={() => navigator.clipboard.writeText(attendee.code)}> {attendee.code}</Button>
                </div>
                <p>{attendee.email}</p>
              </div>
            )
          }

          <div className="flex flex-col items-end gap-4 ">
            <Button onClick={handleShowForm} iconName="pencil">Editar participante</Button>

            <Button onClick={handleUpdateAttendeeCode} iconName="repeat">Gera novo código</Button>

            <Button onClick={handleDelete} iconName="trash" variant="secondary">Deletar participante</Button>
          </div>
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
          <h1 className="text-2xl font-bold">Participante nào está em nenhum evento</h1>
        )
      }
    </div>
  )
}