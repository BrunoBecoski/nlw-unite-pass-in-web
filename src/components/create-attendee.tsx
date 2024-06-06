import { FormEvent, useRef } from 'react'
import * as  z from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

export function CreateAttendee() {
 const nameRef = useRef<HTMLInputElement>(null)
 const emailRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value

    const result = schema.safeParse({
      name,
      email,
    })

    if (result.success == false) {
      alert(result.error)
      return
    }
      
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nome: </label>
      <input id="name" className="text-black" ref={nameRef} />

      <label htmlFor="email">Email: </label>
      <input id="email" className="text-black" ref={emailRef} />

      <button type="submit">Criar participante</button>
    </form>
  )
}