import { ComponentProps } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean;
}

export function IconButton({ transparent = false, ...props }: IconButtonProps) {
  return (
    <button
      className={`
        border border-white/10 rounded-md p-1.5 enabled:hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed 
        ${transparent ? 'bg-black/20' : 'bg-white/20'}
      `}
      {...props}
    />
  )
}