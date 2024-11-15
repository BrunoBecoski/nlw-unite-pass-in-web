import { ComponentProps, ReactNode, useEffect, useRef } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
  selected?: boolean
}

export function NavLink({ children, selected = false, ...props }: NavLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    anchorRef.current?.addEventListener('click', (event) => {
      event.preventDefault()
    })
  }, [anchorRef])

  return (
    <a 
      className={`shadow-white
        font-medium text-sm border-b
        ${selected ? 'border-orange-400' : 'border-transparent'}
      `} 
      ref={anchorRef} 
      {...props}
    >
      {children}
    </a>
  )
}