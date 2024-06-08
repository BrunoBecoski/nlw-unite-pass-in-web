import { useState } from 'react'
import * as  z from 'zod'

import { FormInput } from './form/form-input';

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

export function CreateAttendee() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessages, setErrorMessages] = useState({ name: '', email: ''})

  function handleSubmit() {
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

    } else {
      console.log(name, email)
    }
  }

  return (
    <div>
      <FormInput
        label='Nome'
        setValue={setName}
        value={name}
        errorMessage={errorMessages.name}
      />

      <FormInput
        label='Email'
        setValue={setEmail}
        value={email}
        errorMessage={errorMessages.email}
      />

      <button onClick={handleSubmit}>Criar participante</button>
    </div>
  )
}