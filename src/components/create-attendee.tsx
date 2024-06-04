import { FormEvent } from 'react'

export function CreateAttendee() {
  
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = event.target['name'].value
    const email = event.target['email'].value

    console.log('Name: ' + name)
    console.log('Email: ' + email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nome: </label>
      <input id="name" />

      <label htmlFor="email">Email: </label>
      <input id="email" />

      <button type="submit">Criar participante</button>
    </form>
  )
}