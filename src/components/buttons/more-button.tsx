import { useState } from 'react'

import { Icon } from '../icon'
import { useRouter } from '../../contexts/router-provider'

interface MoreButtonProps {
  slug?: string
  code?: string
  variant: 'event' | 'attendee'
}

export function MoreButton({ 
  slug,
  code,
  variant,
}: MoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { changeRoute } = useRouter()


  function handleDetails() {
    if (variant == 'event' && slug != undefined) {
      changeRoute({ route: 'event', slug })
    }
    
    if (variant == 'attendee') {
      changeRoute({ route: 'attendee', code })
    }
  }

  function handleRegister() {
    if (variant == 'event') {
      console.log('register attendee on event: ' + slug)
    }
    
    if (variant == 'attendee') {
      console.log('register event on attendee: ' + slug)
    }
  }

  function handleEdit() {
    if (variant == 'event') {
      console.log('edit event: ' + slug)
    }
    
    if (variant == 'attendee') {
      console.log('edit attendee: ' + slug)
    }
  }

  function handleDelete() {
    if (variant == 'event') {
      console.log('delete event: ' + slug)
    }
    
    if (variant == 'attendee') {
      console.log('delete attendee: ' + slug)
    }
  }

  return (
    <div className="relative flex items-center">
      <button 
        className="size-7 p-1.5 rounded-md bg-zinc-950 border border-white/10 flex items-center justify-center hover:border-orange-500 transition"
        title={isOpen ? 'Fechar' : 'Mais'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon 
          name={isOpen ? 'x' : 'ellipsis'}
          color="white"
          size="sm"
        />

      </button>
      {isOpen &&
        <div
          className="w-72 p-1.5 rounded-md bg-zinc-950 border border-white/10 absolute right-9 flex flex-col gap-1"
          onMouseLeave={() => setIsOpen(false)}
        >
          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleDetails}
          >
            <Icon name="eye" size="sm"/>
            {variant == 'event' 
              ? 'Ver detalhes do evento' 
              : 'Ver detalhes do participante'
            }
          </button>

          <span className="w-full h-[1px] bg-white/10" />

          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleRegister}
          >
            <Icon name="plus" size="sm"/>
            {variant == 'event' && 'Registar um participante no evento'}
            {variant == 'attendee' && 'Registar um evento no participante'}
          </button>
          
          <span className="w-full h-[1px] bg-white/10" />

          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleEdit}
          >
            <Icon name="pencil" size="sm" />
            {variant == 'event' && 'Editar o evento'}
            {variant == 'attendee' && 'Editar o participante'}
          </button>

          <span className="w-full h-[1px] bg-white/10" />
          
          <button className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleDelete}
          >
            <Icon name="trash" size="sm" />
            {variant == 'event' && 'Deletar o evento'}
            {variant == 'attendee' && 'Deletar o participante'}
          </button>
        </div>
      }
    </div>
  )
}