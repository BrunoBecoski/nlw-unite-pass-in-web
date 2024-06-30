import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import { Button, IconButton } from './button'

export type ModalData = {
  variant?: 'default' | 'success' | 'error'
  title?: string
  message?: string
  button?: string
  attendee?: {
    code: string,
  }
}

interface ModalProps {
  showModal: boolean
  handleCloseModal: () => void
  data: ModalData
}

export function Modal({ data, showModal, handleCloseModal }: ModalProps) {
  let styles = []

  switch (data.variant) {
    case 'success': styles.push('bg-emerald-950/50', 'border-emerald-500', 'text-emerald-500'); break;
    case 'error': styles.push('bg-red-950/50', 'border-red-500', 'text-red-500'); break;
    default:  styles.push('bg-orange-950/50', 'border-orange-500', 'text-orange-500'); break;
  }

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
          <div className={twMerge(
            'fixed inset-0 flex items-center justify-center',
            styles[0],
          )}>
            <div className={twMerge(
              'flex flex-col items-center justify-between min-w-96 min-h-96 bg-zinc-950 text-white p-6 rounded-lg relative border',
              styles[1],
            )}
            >
              <IconButton 
                name="x"
                onClick={handleCloseModal}
                variant="close"      
                title="Fechar"
                className="absolute top-2 right-2"
              />

                <h2 className={twMerge(
                  'text-xl font-bold my-4 text-center',
                  styles[2]
                )}>
                  {data.title}
                </h2>

                <p>{data.message}</p>

                { data.attendee &&
                  <p>Código do participante: <span>{data.attendee.code}</span></p>
                }

                {data.variant == 'default' &&
                  <Button onClick={handleCloseModal} variant="default">{data.button}</Button>
                }

                {data.variant == 'success' &&
                  <Button onClick={handleCloseModal} variant="confirm">{data.button}</Button>
                }

                {data.variant == 'error' &&
                  <Button onClick={handleCloseModal} variant="cancel">{data.button}</Button>
                }
              </div>

          </div>,
          document.body
        )
      }
    </div>
  )
}