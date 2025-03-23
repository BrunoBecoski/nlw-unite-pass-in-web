import { FormEvent, useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import * as  z from 'zod'

import { EventAndAttendeesType, updateEvent } from '../../fetches'
import { useRouter } from '../../contexts/router-provider'

import { Input, InputVariants } from '../input'
import { Button } from '../button'

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

const div = tv({
  base: 'flex flex-col justify-center items-center gap-4 fixed top-0 bottom-0 w-80 bg-zinc-950 border-l border-zinc-600 transition-all duration-500',

  variants: {
    isOpen: {
      true: 'right-0',
      false: '-right-[320px]',
    }
  }
})

interface UpdateEventProps extends VariantProps<typeof div> {
  setIsOpen: (isOpen: boolean) => void
  event: EventAndAttendeesType
  setEvent: (event: EventAndAttendeesType) => void
}

export function UpdateEvent({ isOpen, setIsOpen, event, setEvent }: UpdateEventProps) {
  const [formStatus, setFormStatus] = useState<FormStatusProps>({} as FormStatusProps)
  const [isLoading, setIsLoading] = useState(false)

  const { changeRoute } = useRouter()

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

      alert(message)

      setEvent({...event, title: updatedEvent.title, details: updatedEvent.details, maximumAttendees: updatedEvent.maximumAttendees, startDate: updatedEvent.startDate, endDate: updatedEvent.endDate  })
      changeRoute({ route: 'event', slug: updatedEvent.slug })

      setIsOpen(false)
  
      return
    }
  }

  return (
    <div className={div({ isOpen })}>
      <div className="absolute top-5 right-5">
        <Button
          title="Fechar"
          onClick={() => setIsOpen(false)}
          iconName="arrow-right"
          variant="icon"
          iconSize="default"
        />
      </div>

      <form  onSubmit={handleSubmit} className="flex flex-col items-center justify-evenly py-30 h-full gap-4">
        <h2 className="text-2xl font-bold">
          Edite o evento
        </h2>
  
        <div className="flex flex-col gap-8">
          <Input
            name="title"
            label="Titulo"
            iconName="type"
            message={formStatus.title?.message}
            variant={formStatus.title?.variant}
            defaultValue={event.title}
            />

          <Input
            name="details"
            label="Detalhes"
            iconName="text"
            message={formStatus.details?.message}
            variant={formStatus.details?.variant}
            defaultValue={event.details}
          />

          <Input
            name="maximumAttendees"
            label="Máximos de participantes"
            iconName="users"
            message={formStatus.maximumAttendees?.message}
            variant={formStatus.maximumAttendees?.variant}
            defaultValue={event.maximumAttendees}
          />

          <Input 
            name="startDate"
            label="Data de inicio"
            iconName="calendar-days"
            type="date"
            message={formStatus.startDate?.message}
            variant={formStatus.startDate?.variant}
            defaultValue={event.startDate && event.startDate.split('T')[0]}
          />

          <Input
            name="endDate"
            label="Data de fim"
            iconName="calendar-days"
            type="date"
            message={formStatus.endDate?.message}
            variant={formStatus.endDate?.variant}
            defaultValue={event.startDate && event.endDate.split('T')[0]}
          />
        </div>

        <Button
          type="submit"
          size="full"
          isLoading={isLoading}
        >
          Editar evento
        </ Button>
      </form>
    </div>
  )
}