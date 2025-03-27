import { FormEvent } from 'react'
import { CalendarPlus } from 'lucide-react'

import { createEventAttendee } from '../../fetches'

interface AddAttendeeProps {
  code: string
  fetchAttendeeEvents: () => void
}

export function AddEvent({ code, fetchAttendeeEvents }: AddAttendeeProps) {  
  async function handleRegisterAttendeeEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const slug = form.get('slug')?.toString()

    if (slug == null || code == undefined) {
      return
    }

    const { successfully, message } = await createEventAttendee({ code, slug })

    if (successfully == false) {
      alert(message)
    }

    if (successfully == true) {
      alert(message)
      fetchAttendeeEvents()
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleRegisterAttendeeEvent}>
      <label className="text-lg font-semibold">Adicione um evento</label>
      <div className="px-3 py-2 border border-white/10 rounded-lg text-sm flex items-center gap-3 text-green focus-within:border-orange">
        <button
          type="submit"
          title="Adicionar evento"
          className="hover:text-orange"
        >
          <CalendarPlus size={18} />
        </button>

        <input
          className="bg-transparent text-white outline-none border-0 p-0 text-sm focus:ring-0 w-44"
          name="slug"
          placeholder="Slug do evento"
          />
      </div>
    </form>
  )
}
