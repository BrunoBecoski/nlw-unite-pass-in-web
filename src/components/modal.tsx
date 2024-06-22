import { createPortal } from 'react-dom'

import { Button, IconButton } from './button'
import { useEffect } from 'react'

export type ModalData = {
  variant?: 'default' | 'success' | 'error'
  title?: string
  message?: string
  button?: string
}

interface ModalProps {
  showModal: boolean
  handleCloseModal: () => void
  data: ModalData
}

export function Modal({ data, showModal, handleCloseModal }: ModalProps) {
  let color = ''

  switch (data.variant) {
    case 'success': color = 'emerald'; break;
    case 'error': color = 'red'; break;
    default: color = 'orange'; break;
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
          <div className={`
            fixed inset-0 flex items-center justify-center 
            bg-${color}-950/50
          `}>
            <div className={`
              min-w-96 min-h-96 bg-zinc-950 text-white p-6 rounded-lg border
              border-${color}-500
            `}>
              <div className="flex justify-end">
                <IconButton 
                  name="x"
                  onClick={handleCloseModal}
                  variant="close"      
                  title="Fechar"
                />
              </div>

              <h2 className={`text-xl font-bold my-4 text-center text-${color}-500`}>
                {data.title}
              </h2>
              <p>{data.message}</p>

              <Button onClick={handleCloseModal} variant={data.variant}>{data.button}</Button>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  )
}