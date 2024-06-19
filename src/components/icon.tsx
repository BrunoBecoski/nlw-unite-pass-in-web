import { Suspense, lazy } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

const fallback = <div className="bg-zinc-950 size-6" />

export type IconName = keyof typeof dynamicIconImports;

interface IconProps {
  name?: IconName
  color?: 'transparent' | 'white' | 'emerald' | 'orange' | 'red'
  size?: 'sm' | 'base'
  className?: string
}

export const Icon = ({ name = 'code-xml', color, size, className }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  const styles = [className]

  switch (size) {
    case 'sm': styles.push('size-4'); break
    case 'base': styles.push('size-6'); break
    default: styles.push('size-6'); break
  }

  switch (color) {
    case 'transparent': styles.push('text-transparent'); break
    case 'white': styles.push('text-white'); break
    case 'emerald': styles.push('text-emerald-400'); break
    case 'orange': styles.push('text-orange-400'); break
    case 'red': styles.push('text-red-400'); break
  }

  return (
    <Suspense fallback={fallback}>
      <LucideIcon className={styles.join(' ')} />
    </Suspense>
  )
}