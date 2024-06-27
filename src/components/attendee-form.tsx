import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../fetches'

import { FormInput } from './input'
import { Button } from './button'
import { Modal, ModalData } from './modal'

const schema = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string({ message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
})

export function AttendeeForm() {
  const [formData, setFormData] = useState({ 
    name: {
      message: '',
      status: 'default',
    },
    email: {
      message: '',
      status: 'default',
    }
  })
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({} as ModalData)
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormData({
      name: {
      message: '',
      status: 'default',
      },
      email: {
        message: '',
        status: 'default',
      }
    })

    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')

    const result = schema.safeParse({
      name,
      email,
    })
    
    if (result.success == false) {
      const { name, email } = result.error.format()

      setFormData({
        name:  {
          status: name ? 'error' : 'success',
          message: name?._errors[0] ? name._errors[0] : 'Valor valido',
        },
        email: { 
          status: email ? 'error' : 'success',
          message: email?._errors[0] ? email._errors[0] : 'Valor valido',
        }
      })

      return
    }
  }

  //   const { message } = await createAttendee({
  //     name: result.data.name,
  //     email: result.data.email,
  //   })
    
  //   handleOpenModal({
  //     title: 'Criar participante',
  //     message,
  //   })

  function handleOpenModal(data: ModalData) {
    setShowModal(true)
    setModalData(data)
  }

  function handleCloseModal() {
    setShowModal(false)
    setModalData({})
  }

  return (
    <div>
      <Modal
        data={modalData}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />

      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          id="name"
          label="Nome"
          iconName="user"
          message={formData.name.message}
          variant={formData.name.status}
        />

        <FormInput
          id="email"
          label="Email"
          iconName="mail"
          message={formData.email.message}
          variant={formData.email.status}
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