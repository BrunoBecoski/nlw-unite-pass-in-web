import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  route: Routes,
  changeRoute: (route: Routes) => void,
  pathname: string,
  pageIndex?: number,
  search?: string,
  changePageIndex: (pageIndex: number) => void,
  changeSearch: (search: string) => void,
}

const initialState: RouterProviderState = {
  route: 'home',
  changeRoute: () => null,
  pathname: '/',
  pageIndex: undefined,
  search: undefined,
  changePageIndex: () => null,
  changeSearch: () => null,
}

const RouterProviderContext = createContext<RouterProviderState>(initialState)

type Routes = 'home' | 'events' | 'attendees'

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const [pathname, setPathname] = useState('/')
  const [pageIndex, setPageIndex] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)

  const [route, setRoute] = useState<Routes>('home')

  useEffect(() => { 
    const { pathname, pageIndex, search } = new CreateUrl()

    setRoute(() => {
      switch (pathname) {
        case '/':
          return 'home'
          
        case '/eventos':
          return 'events'
        
        case '/participantes':
          return 'attendees'
        
        default:
          return 'home'
      }
    })
    setPathname(pathname)
    setPageIndex(pageIndex)
    setSearch(search)
  }, [])

  function changeRoute(route : Routes) {
    
    setRoute(route)

    switch (route) {
      case 'home':
        updateUrl('/')
        break;
        
      case 'events':
        updateUrl('/eventos')
        break;
        
      case 'attendees':
        updateUrl('/participantes')
        break;
    
      default:
        updateUrl('/')
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

  const value: RouterProviderState = {
    route,
    changeRoute,
    pathname,
    pageIndex,
    search,
    changePageIndex,
    changeSearch,
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