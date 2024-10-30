import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { Button } from './button'
import { IconButton } from './buttons/icon-button'
import { AttendeeTypes } from '../fetches'

export type ModalData = {
  variant?: 'default' | 'success' | 'error'
  title?: string
  message?: string
  button?: string
  attendee?: AttendeeTypes
}

interface ModalProps {
  showModal: boolean
  handleCloseModal: () => void
  data: ModalData
}

export function Modal({ data, showModal, handleCloseModal }: ModalProps) {

  useEffect(() => {
    if (showModal == true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [showModal])

  return (
    <div>
      { showModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center justify-between min-w-96 min-h-96 bg-zinc-950 text-white p-6 rounded-lg relative border border-orange-500">
              <IconButton 
                name="x"
                onClick={handleCloseModal}
                variant="close"      
                title="Fechar"
                className="absolute top-2 right-2"
              />

                <h2 className="text-xl font-bold my-4 text-center">
                  {data.title}
                </h2>

                <p>{data.message}</p>

                { data.attendee &&
                  <>
                    <p>Nome do participante: <span>{data.attendee.name}</span></p>
                    <p>Email do participante: <span>{data.attendee.email}</span></p>
                    <p>Código do participante: <span>{data.attendee.code}</span></p>
                  </>
                }

                <Button onClick={handleCloseModal}>{data.button}</Button>
              </div>
          </div>,
          document.body
        )
      }
    </div>
  )
}