import { ReactNode, createContext, useContext, useState } from 'react'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  route: Routes
  setRoute: (route: Routes) => void
}

const initialState: RouterProviderState = {
  route: '/', 
  setRoute: () => null,
}

type Routes = '/' | '/eventos' | '/evento/unite-summit/participantes'

const RouterProviderContext = createContext<RouterProviderState>(initialState)

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const [route, setRoute] = useState<Routes>('/')

  const value = {
    route,
    setRoute
  }

  return (
    <RouterProviderContext.Provider value={value} {...props}>
      {children}
    </RouterProviderContext.Provider>
  )
}

export const useRouter = () => {
  const context = useContext(RouterProviderContext)

  if (context === undefined) {
    console.log('useRouter must be used within a RouterProvider')
  }

  return context
}