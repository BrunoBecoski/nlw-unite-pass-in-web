import { UserPlus } from 'lucide-react'
import { FormEvent } from 'react'

import { createEventAttendee } from '../../fetches'

interface AddAttendeeProps {
  slug?: string
  fetchEvent: () => void
}

export function AddAttendee({ slug, fetchEvent }: AddAttendeeProps) {
  async function handleRegisterEventAttendee(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const code = form.get('code')?.toString()

    if (code == null || slug == undefined) {
      return
    }

    const { successfully, message } = await createEventAttendee({ code, slug })

    if (successfully == false) {
      alert(message)
    }

    if (successfully == true) {
      alert(message)
      fetchEvent()
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleRegisterEventAttendee}>
      <label className="text-lg font-semibold">Adicione um participante</label>
      <div className="px-3 py-2 border border-white/10 rounded-lg text-sm flex items-center gap-3 text-emerald-400 focus-within:border-orange-500">
        <button type="submit" title="Adicionar participante" className="hover:text-orange-500">
          <UserPlus size={18} />
        </button>

        <input
          className="bg-transparent text-white outline-none border-0 p-0 text-sm focus:ring-0 w-44" 
          name="code"
          placeholder="Código do participante"
        />
      </div>
    </form>
  )
}