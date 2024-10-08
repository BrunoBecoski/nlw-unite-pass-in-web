import { FormInput } from '../input'
import { Button } from '../buttons/button'

export function EventForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Criar evento
      </h1>

      <form className="flex flex-col gap-4">
        <FormInput
          id="title"
          label="Titulo"
          iconName="minus"
        />

        <FormInput
          id="details"
          label="Detalhes"
          iconName="text"
        />

        <FormInput
          id="maximumAttendees"
          label="Máximos de participantes"
          iconName="users"
        />

        <Button
          iconName="calendar-plus"
          type="submit"
        >
          Criar participante
        </ Button>
      </form>
    </div>
  )
}