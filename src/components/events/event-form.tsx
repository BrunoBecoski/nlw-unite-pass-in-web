import { Input } from '../input'
import { Button } from '../button'

export function EventForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Criar evento
      </h1>

      <form className="flex flex-col gap-4">
        <Input
          id="title"
          label="Titulo"
          iconName="minus"
        />

        <Input
          id="details"
          label="Detalhes"
          iconName="text"
        />

        <Input
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