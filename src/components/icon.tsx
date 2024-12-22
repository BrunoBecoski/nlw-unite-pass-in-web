import { Suspense, lazy } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { tv, type VariantProps } from 'tailwind-variants';

const fallback = <div className="bg-zinc-950 size-6" />

export type IconName = keyof typeof dynamicIconImports;

const icon = tv({
  variants: {
    color: {
      default: '',
      transparent: 'text-transparent',
      white: 'text-white',
      emerald: 'text-emerald-300',
      orange: 'text-orange-300',
      red: 'text-red-400',
    },

    size: {
      default: 'size-6',
      sm: 'size-4',
    },

    animation: {
      default: '',
      spin: 'animate-spin'
    }
  },

  defaultVariants: {
    color: 'default',
    size: 'default',
    animation: 'default',
  }
})

interface IconProps extends VariantProps<typeof icon> {
  name?: IconName
}

export const Icon = ({ name = 'code-xml', color, size, animation }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon className={icon({ color, size, animation })} />
    </Suspense>
  )
}