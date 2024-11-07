import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../../fetches'
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

export function AttendeeForm() {
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

    const { successfully, message, attendee } = await createAttendee({
      name: validatedForm.name,
      email: validatedForm.email,
    })

    if (successfully == false || attendee == undefined) {
      setIsLoading(false)

      alert(message)

      return
    }

    if  (successfully === true)  {
      setIsLoading(false)

      const response = confirm(message)

      if (response) {
        changeRoute({ route: 'attendee', code: attendee.code })
      }

      return
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">


      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <form  onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <Input
          name="name"
          label="Nome"
          iconName="user"
          message={formStatus.name?.message}
          variant={formStatus.name?.variant}
        />

        <Input
          name="email"
          label="Email"
          iconName="mail"
          message={formStatus.email?.message}
          variant={formStatus.email?.variant}
        />

        <Button
          type="submit"
          variant="primary"
          size="full"
          isLoading={isLoading}
        >
          Criar participante
        </ Button>
      </form>
    </div>
  )
}