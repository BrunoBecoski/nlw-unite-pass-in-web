import { createPortal } from 'react-dom'

import { IconButton } from './button'

interface ModalProps {
  title?: string
  message?: string
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export function Modal({ title, message, showModal, setShowModal }: ModalProps) {
  function handleOpenModal() {
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <div>
      { showModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-orange-950/50">
            <div className="relative bg-zinc-950 text-white p-6 rounded-lg">
              <div className="flex justify-end">
                <IconButton 
                  name="x"
                  onClick={handleCloseModal}
                  variant="close"
      
                  title="Fechar"
                />
              </div>

              <h2>{title}</h2>
              <p>{message}</p>

            </div>
          </div>,
          document.body
        )
      }
    </div>
  )
}