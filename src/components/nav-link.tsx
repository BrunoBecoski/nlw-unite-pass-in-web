import { ComponentProps, ReactNode } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
}

export function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <a className="font-medium text-sm" {...props}>
      {children}
    </a>
  )
}