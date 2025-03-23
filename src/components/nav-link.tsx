import { ComponentProps, ReactNode, useEffect, useRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode
  selected?: boolean
}

const a = tv({
  base: 'font-bold text-md border-b-2 hover:text-white',

  variants: {
    selected: {
      true: 'text-white border-orange',
      false: 'text-gray-200 border-transparent hover:border-orange/50'
    }
  },

  defaultVariants: {
    selected: false,
  }
})

interface NavLinkProps extends ComponentProps<'a'>, VariantProps<typeof a> {}

export function NavLink({ children, selected, ...props }: NavLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    anchorRef.current?.addEventListener('click', (event) => {
      event.preventDefault()
    })
  }, [anchorRef])

  return (
    <a 
      className={a({ selected })}
      ref={anchorRef} 
      {...props}
    >
      {children}
    </a>
  )
}