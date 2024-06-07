import { FormEvent, useRef, useState } from 'react'
import * as  z from 'zod'

const schema = z.object({
  name: z.string().min(3, { message: 'Mínimo 3 caráteres' }),
  email: z.string().email({ message: 'Email inválido' }),
})

export function CreateAttendee() {
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setNameMessage('')
    setEmailMessage('')

    event.preventDefault()

    const name = nameRef.current
    const email = emailRef.current

    if (name == null || email == null) {
      return 
    }

    const nameValue = name.value
    const emailValue = email.value

    const result = schema.safeParse({
      name: nameValue,
      email: emailValue,
    })

    if (result.success == true) {
      console.log(result)
    } else {
      const { name, email } = result.error.format()

      if (name != undefined) {
        setNameMessage(name._errors[0])
      }

      if (email != undefined) {
        setEmailMessage(email._errors[0])
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome: </label>
        <input id="name" className="text-black" ref={nameRef} />
        <span className="text-red-500">{nameMessage}</span>
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" className="text-black" ref={emailRef} />
        <span className="text-red-500">{emailMessage}</span>
      </div>

      <button type="submit">Criar participante</button>
    </form>
  )
}