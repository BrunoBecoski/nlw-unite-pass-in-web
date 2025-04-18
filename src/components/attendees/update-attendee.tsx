import { FormEvent, useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import * as  z from 'zod'

import { AttendeeTypes, updateAttendee } from '../../fetches'
import { useRouter } from '../../contexts/router-provider'

import { Input, InputVariants } from '../input'
import { Button } from '../button'

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

const div = tv({
  base: 'flex flex-col justify-center items-center gap-4 fixed top-0 bottom-0 w-80 bg-zinc-950 border-l border-zinc-600 transition-all duration-500',

  variants: {
    isOpen: {
      true: 'right-0',
      false: '-right-[320px]',
    }
  }
})

interface UpdateAttendeeProps extends VariantProps<typeof div> {
  setIsOpen: (isOpen: boolean) => void
  attendee: AttendeeTypes
  setAttendee: (attendee: AttendeeTypes) => void
}

export function UpdateAttendee({ isOpen, setIsOpen, attendee, setAttendee  }: UpdateAttendeeProps) {
  const [formStatus, setFormStatus] = useState<FormStatusProps>({} as FormStatusProps)
  const [isLoading, setIsLoading] = useState(false)

  const { changeRoute } = useRouter()
  
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
      changeRoute({ route: 'attendee', code: updatedAttendee.code })

      setIsOpen(false)

      return
    }
  }
  return (
    <div className={div({ isOpen })}>
      <div className="absolute top-5 right-5">
        <Button
          title='Fechar'
          onClick={() => setIsOpen(false)}
          iconName="arrow-right"
          variant="icon"
          iconSize="default"
        />
      </div>

      <form  onSubmit={handleSubmit} className="flex flex-col items-center justify-evenly h-full gap-4">
        <h2 className="text-2xl font-bold">
          Edite o participante
        </h2>
  
        <div className="flex flex-col gap-8">
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
        </div>

        <Button
          type="submit"
          size="full"
          isLoading={isLoading}
        >
          Editar participante
        </Button>
      </form>
    </div>
  )
}