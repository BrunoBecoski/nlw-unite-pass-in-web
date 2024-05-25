import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  pathname: string,
  pageIndex?: number,
  search?: string,
  changePageIndex: (pageIndex: number) => void,
  changeSearch: (search: string) => void,
  toHome: () => void,
  toEvents: () => void,
  toAttendees: () => void,
}

const initialState: RouterProviderState = {
  pathname: '/',
  pageIndex: undefined,
  search: undefined,
  changePageIndex: () => null,
  changeSearch: () => null,
  toHome: () => null,
  toEvents: () => null,
  toAttendees: () => null,
}

const RouterProviderContext = createContext<RouterProviderState>(initialState)

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
 
  const [pathname, setPathname] = useState('/')
  const [pageIndex, setPageIndex] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)

  useEffect(() => {
    const { pathname, pageIndex, search } = new CreateUrl({})

    setPathname(pathname)
    setPageIndex(pageIndex)
    setSearch(search)
  }, [])


  function toHome() {
    setPathname('/')
    setPageIndex(undefined)
    setSearch(undefined)

    updateUrl()
  }

  function toEvents() {
    setPathname('/eventos')
    setPageIndex(undefined)
    setSearch(undefined)

    updateUrl()
  }

  function toAttendees() {
    setPathname('/participantes')
    setPageIndex(undefined)
    setSearch(undefined)

    updateUrl()
  }

  function changePageIndex(pageIndex: number | undefined) {
    setPageIndex(pageIndex)
            
    updateUrl()
  }

  function changeSearch(search: string | undefined) {
    if (search?.length == 0) {        
      setSearch(undefined)
      updateUrl()

      return
    }
    
    setSearch(search)
    setPageIndex(1)
    updateUrl()
  }
  

  function updateUrl() {

  console.log('updateUrl')
    const { url } = new CreateUrl({
      pageIndex, 
      pathname,
      search,
    })

    window.history.pushState({}, '', url)
  }

  const value: RouterProviderState = {
    pathname,
    pageIndex,
    search,
    changePageIndex,
    changeSearch,
    toHome,
    toEvents,
    toAttendees,
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