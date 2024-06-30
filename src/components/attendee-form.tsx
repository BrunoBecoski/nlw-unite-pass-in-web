import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { createAttendee } from '../fetches'

import { FormInput, InputVariants } from './input'
import { Button } from './button'
import { Modal, ModalData } from './modal'

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
        name,
        email,
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

    console.log(validatedForm)

    // const { message } = await createAttendee({
    //   name: validatedForm.name,
    //   email: validatedForm.email,
    // })
    
    // handleOpenModal({
    //   title: 'Criar participante',
    //   message,
    // })
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
        <FormInput
          id="name"
          label="Nome"
          iconName="user"
          message={formStatus.name?.message}
          variant={formStatus.name?.variant}
        />

        <FormInput
          id="email"
          label="Email"
          iconName="mail"
          message={formStatus.email?.message}
          variant={formStatus.email?.variant}
        />

        <Button
          iconName="user-plus"
          type="submit"
        >
          Criar participante
        </ Button>

        <Button
          type="submit"
          variant="confirm"
        >
          Criar participante
        </ Button>

        <Button
          type="submit"
          variant="cancel"
        >
          Criar participante
        </ Button>
      </form>
    </div>
  )
}