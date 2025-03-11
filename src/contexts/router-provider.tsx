import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  route: Routes,
  changeRoute: (props: ChangeRoutesProps) => void,
  pathname: string,
  pageIndex?: number,
  search?: string,
  slug?: string,
  code?: string,
  changePageIndex: (pageIndex: number) => void,
  changeSearch: (search: string) => void,
  changeSlug: (slug: string) => void,
  changeCode: (code: string) => void,
}

const initialState: RouterProviderState = {
  route: 'events',
  changeRoute: () => null,
  pathname: '/eventos',
  pageIndex: undefined,
  search: undefined,
  slug: undefined,
  code: undefined,
  changePageIndex: () => null,
  changeSearch: () => null,
  changeSlug: () => null,
  changeCode: () => null,
}

const RouterProviderContext = createContext<RouterProviderState>(initialState)

export type Routes = 'events' | 'attendees' | 'createAttendee' | 'createEvent' | 'event' | 'attendee'

interface ChangeRoutesProps {
  route: Routes
  slug?: string 
  code?: string
}

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const [pathname, setPathname] = useState('/eventos')
  const [pageIndex, setPageIndex] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [code, setCode] = useState<string | undefined>(undefined)

  const [route, setRoute] = useState<Routes>('events')

  useEffect(() => { 
    const { pathname, pageIndex, search, slug, code } = new CreateUrl()

    switch (pathname) {
      case '/eventos':
        setRoute('events')
        break;
        
      case '/participantes':
        setRoute('attendees')
        break;
        
      case '/evento':
        setRoute('event')
        break;

      case '/participante':
        setRoute('attendee')
        break;
        
      default:
        setRoute('events')
        setPathname('/eventos')
        updateUrl('/eventos')
        break;
    } 

    setPathname(pathname)
    setPageIndex(pageIndex)
    setSearch(search)
    setSlug(slug)
    setCode(code)
  }, [])

  function changeRoute({ route, slug, code }: ChangeRoutesProps) {

    switch (route) {
      case 'events':
        setRoute(route)
        updateUrl('/eventos')
        break;
        
      case 'attendees':
        setRoute(route)
        updateUrl('/participantes')
        break;
      
      case 'createAttendee':
        setRoute(route)
        updateUrl('/criar/participante')
        break;

      case 'createEvent':
        setRoute(route)
        updateUrl('/criar/evento')
        break;

      case 'event':
        if (slug != undefined) {
          changeSlug(slug)
          setRoute(route)
          updateUrl(`/evento/${slug}`)
        }
        break;

      case 'attendee':
        if (code != undefined) {
          changeCode(code)
          setRoute(route)
          updateUrl(`/participante/${code}`)
        }
        break;

      default:
        setRoute(route)
        updateUrl('/eventos')
        break;
    }
  }

  function updateUrl(pathname: string) {
    const { url } = new CreateUrl({
      pathname
    })

    setPathname(pathname)
    setPageIndex(undefined)
    setSearch(undefined)

    window.history.pushState({}, '', url)
  }

  function changePageIndex(pageIndex: number | undefined) {
    const { url } = new CreateUrl({
      pageIndex,
    })
    
    setPageIndex(pageIndex)

    window.history.pushState({}, '', url)
  }

  function changeSearch(search: string | undefined) {
    if (search?.length == 0) {        
      const { url } = new CreateUrl({
        pageIndex: 1,
        search: undefined,
      })

      setPageIndex(1)
      setSearch(undefined)
      
      window.history.pushState({}, '', url)
      return
    }
    
    const { url } = new CreateUrl({
      pageIndex: 1,
      search,
    })
    
    setPageIndex(1)
    setSearch(search)

    window.history.pushState({}, '', url)
  }

  function changeSlug(slug: string | undefined) {
    const { url } = new CreateUrl({
      slug,
    })

    setSlug(slug)

     window.history.pushState({}, '', url)
  }

  function changeCode(code: string | undefined) {
    const { url } = new CreateUrl({
      code,
    })

    setCode(code)

    window.history.pushState({}, '', url)
  }

  const value: RouterProviderState = {
    route,
    changeRoute,
    pathname,
    pageIndex,
    search,
    slug,
    code,
    changePageIndex,
    changeSearch,
    changeSlug,
    changeCode,
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