import { ReactNode, createContext, useContext, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  currentRoute: Routes,
  toHome: () => void,
  toEvents: () => void,
  toEventSlugAttendee: () => void,
}

const initialState: RouterProviderState = {
  currentRoute: 'home',
  toHome: () => null,
  toEvents: () => null,
  toEventSlugAttendee: () => null,
}

type Routes = 'home' | 'events' | 'eventSlugAttendee'

const RouterProviderContext = createContext<RouterProviderState>(initialState)

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const [currentRoute, setCurrentRoute] = useState<Routes>('home')

  function toHome() {
    const url = new CreateUrl()

    url.setPathname = '/'

    setCurrentRoute('home')
    history.pushState({}, '', url.getUrl)
  }

  function toEvents() {
    const url = new CreateUrl()

    url.setPathname = '/eventos'

    setCurrentRoute('events')
    history.pushState({}, '', url.getUrl)
  }

  function toEventSlugAttendee() {
    const url = new CreateUrl()

    url.setPathname = '/evento/unite-summit/participantes'

    setCurrentRoute('eventSlugAttendee')
    history.pushState({}, '', url.getUrl)
  }

  const value: RouterProviderState = {
    currentRoute,
    toHome,
    toEvents,
    toEventSlugAttendee,
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