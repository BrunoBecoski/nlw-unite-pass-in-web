import { FormEvent, useState } from 'react'
import * as  z from 'zod'

import { Input } from '../input'
import { Button } from '../button'

const schema = z.object({
  title: z.string({ message: 'Titulo obrigatório' }).min(4),
  details: z.string({ message: 'Detalhes obrigatório' }),
  maximumAttendees: z.number({ message: 'Máximos de participantes obrigatório' }).int().positive(),
  startDate: z.string({ message: 'Date de inicio obrigatório' }).min(10),
  endDate: z.string({ message: 'Date de fim obrigatório' }).min(10),
})

export function EventForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()
    
    const form = new FormData(event.currentTarget)

    const title = form.get('title')
    const details = form.get('details')
    const maximumAttendees = form.get('maximumAttendees')
    const startDate = form.get('startDate')
    const endDate = form.get('endDate')

    console.log(title)
    console.log(details)
    console.log(maximumAttendees)
    console.log(startDate)
    console.log(endDate)

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">

      <h1 className="text-2xl font-bold">
        Criar evento
      </h1>

      <form  onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <Input
          name="title"
          label="Titulo"
          iconName="minus"
        />

        <Input
          name="details"
          label="Detalhes"
          iconName="text"
        />

        <Input
          name="maximumAttendees"
          label="Máximos de participantes"
          iconName="users"
        />

        <Input 
          name="startDate"
          label="Data de inicio"
          iconName="calendar"
          type="date"
          />

        <Input
          name="endDate"
          label="Data de fim"
          iconName="calendar"
          type="date"
        />

        <Button
          type="submit"
          iconName="calendar-plus"
          variant="primary"
          size="full"
          isLoading={isLoading}
        >
          Criar evento
        </ Button>
      </form>
    </div>
  )
}