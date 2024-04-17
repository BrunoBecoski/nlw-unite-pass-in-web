import { ComponentProps, ReactNode, useEffect, useRef } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
}

export function NavLink({ children, ...props }: NavLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    anchorRef.current?.addEventListener('click', (event) => {
      event.preventDefault()
    })
  }, [anchorRef])

  return (
    <a className="font-medium text-sm" ref={anchorRef} {...props}>
      {children}
    </a>
  )
}