import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  currentRoute: Routes,
  slug: string,
  pageIndex: number,
  search: string,
  setPageIndex: (pageIndex: number) => void,
  setSearch: (search: string) => void,
  toHome: () => void,
  toEvents: () => void,
  toEventSlugAttendee: (slug: string) => void,
}

const initialState: RouterProviderState = {
  currentRoute: 'home',
  slug: '',
  pageIndex: 1,
  search: '',
  setPageIndex: () => null,
  setSearch: () => null,
  toHome: () => null,
  toEvents: () => null,
  toEventSlugAttendee: () => null,
}

type Routes = 'home' | 'events' | 'eventSlugAttendees'

const RouterProviderContext = createContext<RouterProviderState>(initialState)

function getSlug(pathname: string) {
  const array = pathname.substring(1).split('/')

  if (array[0] === 'evento' && array[2] === 'participantes') {
    return array[1]
  }

  return ''
}

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const url = new CreateUrl()

  const [currentRoute, setCurrentRoute] = useState<Routes>('home') 
  const [pathname, setPathname] = useState(url.getPathname)
  const [slug, setSlug] = useState(getSlug(url.getPathname))
  const [pageIndex, setPageIndex] = useState(url.getPageIndex ? Number(url.getPageIndex) : 1)
  const [search, setSearch] = useState(url.getSearch ? url.getSearch : '')


  function toHome() {
    const url = new CreateUrl()

    url.setPathname = '/'
    
    setCurrentRoute('home')
    setPathname(url.getPathname)
    history.pushState({}, '', url.getUrl)
  }

  function toEvents() {
    const url = new CreateUrl()

    url.setPathname = '/eventos'

    setCurrentRoute('events')
    setPathname(url.getPathname)
    setPageIndex(1)
    setSearch('')
    history.pushState({}, '', url.getUrl)
  }

  function toEventSlugAttendee(slug: string) {
    const url = new CreateUrl()

    const pathname = `/evento/${slug}/participantes`

    url.setPathname = pathname

    setCurrentRoute('eventSlugAttendees')
    setPathname(url.getPathname)
    setSlug(slug)
    setPageIndex(1)
    setSearch('')

    history.pushState({}, '', url.getUrl)
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
    toEventSlugAttendee,
  }

  window.addEventListener("popstate", () => {
    const url = new CreateUrl()

    setPathname(url.getPathname)
    setPageIndex(url.getPageIndex ? Number(url.getPageIndex) : 1)
    setSearch(url.getSearch ? url.getSearch : '')
    setSlug(getSlug(url.getPathname))
  });

  useEffect(() => {
    if (pathname === '/') {
      setCurrentRoute('home')
    }

    if (pathname === '/eventos') {
      setCurrentRoute('events')
    }

    if (pathname === `/evento/${slug}/participantes`) {
      setCurrentRoute('eventSlugAttendees')
    }
  }, [pathname])

  useEffect(() => {
    const url = new CreateUrl()

    url.setPageIndex = String(pageIndex)

    window.history.pushState({}, '', url.getUrl)

  }, [pageIndex])

  useEffect(() => {
    const url = new CreateUrl()
    
    url.setSearch = search

    window.history.pushState({}, '', url.getUrl) 
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