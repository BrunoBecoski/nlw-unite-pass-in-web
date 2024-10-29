import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { tv, type VariantProps } from 'tailwind-variants'

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

const modal = tv({
  slots: {
    div_1: 'fixed inset-0 flex items-center justify-center',
    div_2: 'flex flex-col items-center justify-between min-w-96 min-h-96 bg-zinc-950 text-white p-6 rounded-lg relative border',
    title: 'text-xl font-bold my-4 text-center'
  },

  variants: {
    variant: {
      default: 'bg-orange-950/50 border-orange-500 text-orange-500',
      success: 'bg-emerald-950/50 border-emerald-500 text-emerald-50',
      error: 'bg-red-950/50 border-red-500 text-red-500',
    }
  },

  defaultVariants: {
    variant: 'default',
  }
})

interface ModalProps extends VariantProps<typeof modal> {
  showModal: boolean
  handleCloseModal: () => void
  data: ModalData
}

export function Modal({ data, showModal, handleCloseModal, variant,    }: ModalProps) {

  const { div_1, div_2, title  } = modal({ variant })

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
          <div className={div_1()}>
            <div className={div_2()}>
              <IconButton 
                name="x"
                onClick={handleCloseModal}
                variant="close"      
                title="Fechar"
                className="absolute top-2 right-2"
              />

                <h2 className={title()}>
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

                {data.variant == 'default' &&
                  <Button onClick={handleCloseModal}>{data.button}</Button>
                }

                {data.variant == 'success' &&
                  <Button onClick={handleCloseModal}>{data.button}</Button>
                }

                {data.variant == 'error' &&
                  <Button onClick={handleCloseModal}>{data.button}</Button>
                }
              </div>

          </div>,
          document.body
        )
      }
    </div>
  )
}