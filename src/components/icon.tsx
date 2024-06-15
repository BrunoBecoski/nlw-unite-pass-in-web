import { Suspense, lazy } from 'react'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

const fallback = <div className="bg-zinc-950 size-6" />

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name?: IconName
  color?: 'white' | 'emerald' | 'orange' | 'red'
  size?: 'sm' | 'base'
}

export const Icon = ({ name = 'code-xml', color, size, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  const className = []

  switch (size) {
    case 'sm': className.push('size-4'); break
    case 'base': className.push('size-6'); break
    default: className.push('size-6'); break
  }

  switch (color) {
    case 'white': className.push('text-white'); break
    case 'emerald': className.push('text-emerald-500'); break
    case 'orange': className.push('text-orange-500'); break
    case 'red': className.push('text-red-500'); break
    default: className.push('text-white'); break
  } 

  return (
    <Suspense fallback={fallback}>
      <LucideIcon 
        className={className.join(' ')}
        {...props}
      />
    </Suspense>
  )
}