import { FormEvent } from 'react'
import * as  z from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

export function CreateAttendee() {
  
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = event.target['name'].value
    const email = event.target['email'].value

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
      <input id="name" className="text-black" />

      <label htmlFor="email">Email: </label>
      <input id="email" className="text-black" />

      <button type="submit">Criar participante</button>
    </form>
  )
}