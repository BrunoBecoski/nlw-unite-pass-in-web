import { Suspense, lazy } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { tv, type VariantProps } from 'tailwind-variants';

const fallback = <div className="bg-zinc-950 size-6" />

export type IconName = keyof typeof dynamicIconImports;

const icon = tv({
  variants: {
    color: {
      transparent: 'text-transparent',
      white: 'text-white',
      emerald: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
    },

    size: {
      default: 'size-6',
      sm: 'size-4',
    },
  },

  defaultVariants: {
    color: 'orange',
    size: 'default',
  }
})

interface IconProps extends VariantProps<typeof icon> {
  name?: IconName
}

export const Icon = ({ name = 'code-xml', color, size  }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon className={icon({ color, size })} />
    </Suspense>
  )
}