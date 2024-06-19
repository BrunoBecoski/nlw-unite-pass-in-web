import { useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../fetches'

import { FormInput } from './input'
import { Button } from './button'

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

export function AttendeeForm() {
  const [errorMessages, setErrorMessages] = useState({ name: '', email: ''})
  
  async function handleSubmit() {
    setErrorMessages({ name: '', email: '' })
    
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value

    const result = schema.safeParse({
      name,
      email,
    })

    if (result.success == false) {
      const { name, email } = result.error.format()

      setErrorMessages({
        name: name ? name._errors[0] : '',
        email: email ? email._errors[0] : '',
      })

      return
    }

   console.log('name: ' + result.data.name)
   console.log('email: ' +  result.data.email)

    // const { message } = await createAttendee({
    //   name: result.data.name,
    //   email: result.data.email,
    // })

    // alert(message)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <div className="flex flex-col gap-4">
        <FormInput
          id="name"
          label="Nome"
          iconName="user"
          message={errorMessages.name}
        />

        <FormInput
          id="email"
          label="Email"
          iconName="mail"
          message={errorMessages.email}
        />

        <Button 
          onClick={handleSubmit}
          iconName="user-plus"
        >
          Criar participante
        </ Button>
      </div>
    </div>
  )
}