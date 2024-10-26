import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../../fetches'

import { Input, InputVariants } from '../input'
import { Button } from '../button'
import { Modal, ModalData } from '../modal'

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
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({} as ModalData)
  
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
    event.preventDefault()
    
    setFormStatus({} as FormStatusProps)
    
    const form = new FormData(event.currentTarget)

    const validatedForm = formValidation(form)

    if (validatedForm == undefined) {
      return
    }

    const { message, attendee } = await createAttendee({
      name: validatedForm.name,
      email: validatedForm.email,
    })

    if (message == 'Email já está sendo utilizado.') {
      handleOpenModal({
        title: 'Erro ao criar o participante',
        message,
        variant: 'error',
        button: 'Tentar novamente'
      })

      return
    }

    if (attendee) {
      handleOpenModal({
        title: 'Sucesso ao criar o participante',
        message,
        attendee,
        variant: 'success',
        button: 'Sucesso'
      })
      
    }
  }

  function handleOpenModal(data: ModalData) {
    setShowModal(true)
    setModalData(data)
  }

  function handleCloseModal() {
    setShowModal(false)
    setModalData({})
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Modal
        data={modalData}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />

      <h1 className="text-2xl font-bold">
        Criar participante
      </h1>

      <form  onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <Input
          id="name"
          label="Nome"
          iconName="user"
          message={formStatus.name?.message}
          variant={formStatus.name?.variant}
        />

        <Input
          id="email"
          label="Email"
          iconName="mail"
          message={formStatus.email?.message}
          variant={formStatus.email?.variant}
        />

        <Button
          type="submit"
          variant="primary"
          size="full"
        >
          Criar participante
        </ Button>
      </form>
    </div>
  )
}