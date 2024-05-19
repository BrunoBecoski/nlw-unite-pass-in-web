import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  currentRoute: Routes,
  slug?: string,
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
  slug: undefined,
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

function getSlug(pathname: string) {
  const array = pathname.substring(1).split('/')

  if (array[0] === 'evento' && array[2] === 'participantes') {
    return array[1]
  }

  return undefined
}

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const url = new CreateUrl({})

  const [currentRoute, setCurrentRoute] = useState<Routes>('home') 
  const [pathname, setPathname] = useState(url.pathname)
  const [slug, setSlug] = useState(getSlug(url.pathname))
  const [pageIndex, setPageIndex] = useState(url.pageIndex)
  const [search, setSearch] = useState(url.search)

  function toHome() {
    const { url, pathname } = new CreateUrl({
      pathname: '/'
    })
    
    setCurrentRoute('home')
    setPathname(pathname)
    history.pushState({}, '', url)
  }

  function toEvents() {
    const { url, pathname } = new CreateUrl({
      pathname: '/eventos'
    })

    setCurrentRoute('events')
    setPathname(pathname)
    setPageIndex(undefined)
    setSearch(undefined)
    history.pushState({}, '', url)
  }

  function toAttendees() {
    const { url, pathname } = new CreateUrl({
      pathname:  '/participantes'
    })

    setCurrentRoute('attendees')
    setPathname(pathname)
    setPageIndex(undefined)
    setSearch(undefined)

    history.pushState({}, '', url)
  }

  const value: RouterProviderState = {
    currentRoute,
    slug,
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