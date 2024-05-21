import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  currentRoute: Routes,
  pageIndex?: number,
  search?: string,
  setPageIndex: (pageIndex: number) => void,
  setSearch: (search: string) => void,
  toHome: () => void,
  toEvents: () => void,
  toAttendees: () => void,
}

const initialState: RouterProviderState = {
  currentRoute: 'home',
  pageIndex: undefined,
  search: undefined,
  setPageIndex: () => null,
  setSearch: () => null,
  toHome: () => null,
  toEvents: () => null,
  toAttendees: () => null,
}

type Routes = 'home' | 'events' | 'attendees' | 'eventSlugAttendees'

const RouterProviderContext = createContext<RouterProviderState>(initialState)

function getCurrentRoute(pathname: string): Routes {
  switch (pathname) {
    case '/':
      return 'home'

    case '/eventos':
      return 'events'
    
    case '/participantes':
      return 'attendees'
  
    default:
      return 'home';
  }
}

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const url = new CreateUrl({})

  const [currentRoute, setCurrentRoute] = useState<Routes>(getCurrentRoute(url.pathname)) 
  const [pathname, setPathname] = useState(url.pathname)
  const [pageIndex, setPageIndex] = useState(url.pageIndex)
  const [search, setSearch] = useState(url.search)

  function toHome() {
    const { url, pathname } = new CreateUrl({
      pathname: '/'
    })

    reset()
    
    setCurrentRoute(getCurrentRoute(pathname))
    setPathname(pathname)

    setPageIndex(undefined)
    history.pushState({}, '', url)
  }

  function toEvents() {
    const { url, pathname } = new CreateUrl({
      pathname: '/eventos'
    })

    reset()

    setCurrentRoute(getCurrentRoute(pathname))
    setPathname(pathname)

    history.pushState({}, '', url)
  }

  function toAttendees() {
    const { url, pathname } = new CreateUrl({
      pathname:  '/participantes'
    })

    reset()

    setCurrentRoute(getCurrentRoute(pathname))
    setPathname(pathname)

    history.pushState({}, '', url)
  }

  function reset() {
    setCurrentRoute('home')
    setPathname('/')
    setPageIndex(undefined)
    setSearch(undefined)
  }

  const value: RouterProviderState = {
    currentRoute,
    pageIndex,
    search,
    setPageIndex,
    setSearch,
    toHome,
    toEvents,
    toAttendees,
  }

  useEffect(() => {
    if (pageIndex != undefined) {
      const { url } = new CreateUrl({
        pathname,
        pageIndex,
      })
            
      window.history.pushState({}, '', url)
    }
  }, [pageIndex])

  useEffect(() => {
    if (search != undefined) {
      const { url } = new CreateUrl({
        pathname,
        search,
      })

      window.history.pushState({}, '', url) 
    }
  }, [search])

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