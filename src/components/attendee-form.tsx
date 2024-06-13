import { useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../fetches'

import { IconButton } from './icon-button';
import { Input } from './input';

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

export function AttendeeForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessages, setErrorMessages] = useState({ name: '', email: ''})

  async function handleSubmit() {
    setErrorMessages({ name: '', email: '' })
    
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

    const { message } = await createAttendee({
      name,
      email,
    })

    alert(message)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          iconName="user"
          id="name"
          label="Nome"
          setValue={setName}
          value={name}
          message={errorMessages.name}
          handleErase={() => setName('')}
        />

        <Input
          iconName="mail"
          id="email"
          label="Email"
          setValue={setEmail}
          value={email}
          message={errorMessages.email}
          handleErase={() => setEmail('')}
        />

        <IconButton onClick={handleSubmit}>Criar participante </ IconButton>
      </div>
    </div>
  )
}