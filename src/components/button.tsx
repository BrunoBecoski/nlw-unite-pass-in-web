import { ComponentProps, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon, IconName } from './icon'

interface ButtonProps extends ComponentProps<'button'> {
  iconName?: IconName
  children?: ReactNode
  variant?: 'default' | 'confirm' | 'cancel'
}

export function Button({ variant = 'default', iconName, children, ...props }: ButtonProps) {
  
  let styles = ''

  switch (variant) {
    case 'confirm': styles = 'bg-emerald-500 hover:bg-emerald-400'; break;
    case 'cancel': styles = 'bg-red-500 hover:bg-red-400'; break;
    default: styles = 'bg-orange-500 hover:bg-orange-400'; break;
  }

  return (
    <button
      className={twMerge(
        'w-full flex items-center justify-center gap-4 px-4 py-2 rounded-lg text-white  transition',
        styles
      )}
      {...props}
    >
      { iconName && <Icon name={iconName} className="w-4 h-4" /> }
      {children}

      { variant == 'confirm' &&  <Icon name="circle-check" className="w-4 h-4" />}
      { variant == 'cancel' &&  <Icon name="circle-alert" className="w-4 h-4" />}
    </button>
  )
}

interface IconButtonProps extends ComponentProps<'button'> {
  name: IconName
  border?: boolean
  disabled?: boolean
  variant?: 'default' | 'close'
  size?: 'base' | 'sm'
}

export function IconButton({ 
  name,
  border = false,
  disabled = false,
  variant = 'default',
  size = 'base',
  ...props
}: IconButtonProps) {
  
  let styles = ''

  switch (variant) {
    case 'close':
      styles = `text-white 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}
      `
      break;

    default:
      styles = `text-orange-500 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-orange-600'}
      `
      break;
  }

  return (
    <button
      className={twMerge(
        'bg-transparent flex items-center justify-center transition',
        border && 'border border-orange-500 hover:border-orange-600 rounded-md p-1',
        styles,
      )}
      {...props}
    >
      <Icon 
        name={name}
        size={size}
      />
    </button>
  )
}

interface MoreButtonProps {
  id: string
  variant: 'event' | 'attendee'
}

export function MoreButton({ 
  id,
  variant
}: MoreButtonProps) {
  const [open, setOpen] = useState(false)

  function handleRegisterAttendeeOnEvent() {
    console.log('register attendee on event: ' + id)
  }

  function handleEditEvent() {
    console.log('edit event: ' + id)
  }

  function handleDeleteEvent() {
    console.log('delete event: ' + id)
  }

  function handleRegisterEventOnAttendee() {
    console.log('register event on attendee: ' + id)
  }

  function handleEditAttendee() {
    console.log('edit attendee: ' + id)
  }

  function handleDeleteAttendee() {
    console.log('delete attendee: ' + id)
  }

  return (
    <button 
      className="size-7 p-1.5 rounded-md bg-zinc-950 border border-white/10 flex items-center justify-center hover:border-orange-500 transition relative"
      title="Mais"
      onClick={() => setOpen(!open)}
    >
      <Icon 
        name="ellipsis"
        color="white"
        size="sm"
      />
       {open && variant == 'event' &&
        <div className="w-72 p-1.5 rounded-md bg-zinc-950 border border-white/10 absolute right-8 flex flex-col gap-1 ">
          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleRegisterAttendeeOnEvent}
          >
            <Icon name="plus" size="sm"/>
            Registar um participante no evento
          </button>
          
          <span className="w-full h-[1px] bg-white/10" />

          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleEditEvent}
          >
            <Icon name="pencil" size="sm" />
            Editar o evento
          </button>

          <span className="w-full h-[1px] bg-white/10" />
          
          <button className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleDeleteEvent}
          >
            <Icon name="trash" size="sm" />
            Deletar o evento
          </button>
        </div>
      }

      {open && variant == 'attendee' &&
        <div className="w-72 p-1.5 rounded-md bg-zinc-950 border border-white/10 absolute right-8 flex flex-col gap-1 ">
          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleRegisterEventOnAttendee}
          >
            <Icon name="plus" size="sm" />
            Registar um evento no participante
          </button>
          
          <span className="w-full h-[1px] bg-white/10" />

          <button 
            className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleEditAttendee}
          >
            <Icon name="pencil" size="sm" />
            Editar o participante
          </button>

          <span className="w-full h-[1px] bg-white/10" />
          
          <button className="flex items-center gap-2 hover:text-orange-500"
            onClick={handleDeleteAttendee}
          >
            <Icon name="trash" size="sm" />
            Deletar o participante
          </button>
        </div>
      }
    </button>
  )
}