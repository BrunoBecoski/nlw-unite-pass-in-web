import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../fetches'

import { FormInput } from './input'
import { Button } from './button'
import { Modal } from './modal'

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

export function AttendeeForm() {
  const [errorMessages, setErrorMessages] = useState({ name: '', email: ''})
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessages({ name: '', email: '' })

    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')

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
      name: result.data.name,
      email: result.data.email,
    })
    
    setModalMessage(message)
    setShowModal(true)
  }

  return (
    <div>
      <Modal
        title="Criar participante"
        message={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          iconName="user-plus"
          type="submit"
        >
          Criar participante
        </ Button>
      </form>
    </div>
  )
}