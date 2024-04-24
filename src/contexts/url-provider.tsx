import { ReactNode, createContext, useContext, useState } from "react";

interface UrlProviderProps {
  children: ReactNode
}

type UrlProviderState = {
  pathname: string
  updatePathname: (newPathname: string) => void
  pageIndex: number
  updatePageIndex: (newPageIndex: number) => void
  search: string
  updateSearch: (newSearch: string) => void
  event: Event
  updateEvent: (event: Event) => void
}

const initialState: UrlProviderState = {
  pathname: '/',
  updatePathname: () => null,
  pageIndex: 1,
  updatePageIndex: () => null,
  search: '',
  updateSearch: () => null,
  event: { id: 'cb9108f2-8d99-4d30-bfa1-bb6e3bb41da0', slug: 'unite-summit' },
  updateEvent: () => null,
}

interface Event {
  id: string
  slug: string
}

const UrlProviderContext = createContext<UrlProviderState>(initialState)

export function UrlProvider({
  children,
  ...props
}: UrlProviderProps) {
  const [url, setUrl] = useState(new URL(window.location.toString()))
  const [pathname, setPathname] = useState(url.pathname)
  const [pageIndex, setPageIndex] = useState(Number(url.searchParams.get('page')) || 1)
  const [search, setSearch] = useState(url.searchParams.get('search') || '')
  const [event, setEvent] = useState({} as Event)

  function updateEvent(event: Event) {
    setSearch('')
    setPageIndex(1)
    setEvent(event)

    const newUrl = url
    newUrl.searchParams.delete('page')
    newUrl.searchParams.delete('search')
    newUrl.pathname = `/evento/${event.slug}/participantes`

    updateUrl(newUrl)
  }

  function updateUrl(newUrl: URL) {
    setUrl(newUrl)
    window.history.pushState({}, '', newUrl)
  }

  function updatePathname(newPathname: string) {
    setPathname(newPathname)
    setSearch('')
    setPageIndex(1)

    const newUrl = new URL(url)
    newUrl.searchParams.delete('page')
    newUrl.searchParams.delete('search')
    newUrl.pathname = newPathname

    updateUrl(newUrl)  
  }


  function updatePageIndex(newPageIndex: number) {
    setPageIndex(newPageIndex)

    const newUrl = new URL(url)
    newUrl.searchParams.set('page', newPageIndex.toString())

    updateUrl(newUrl)
  }

  function updateSearch(newSearch: string) {
    setSearch(newSearch)
    setPageIndex(1)

    const newUrl = new URL(url)

    newUrl.searchParams.set('search', newSearch)
    newUrl.searchParams.set('page', '1'),

    updateUrl(newUrl)
  }

  const value = {
    pathname,
    updatePathname,
    pageIndex,
    updatePageIndex,
    search,
    updateSearch,
    event,
    updateEvent,
  }

  return (
    <UrlProviderContext.Provider value={value} {...props}>
      {children}
    </UrlProviderContext.Provider>
  )
}

export const useUrl = () => {
  const context = useContext(UrlProviderContext)
  
  if (context === undefined) 
    console.log('useUrl must be used within a UrlProvider ')

  return context
}