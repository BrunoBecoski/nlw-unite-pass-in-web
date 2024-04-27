import { ReactNode, createContext, useContext, useState } from "react";

interface UrlProviderProps {
  children: ReactNode
}

interface ParamsProps {
  pageIndex: number
  search: string
}

type UrlProviderState = {
  pathname: string
  slug: string
  params: ParamsProps
  updatePathname: (newPathname: string) => void
  updatePageIndex: (newPageIndex: number) => void
  updateSearch: (newSearch: string) => void
  updateSlug: (slug: string) => void
}

const initialState: UrlProviderState = {
  pathname: '/',
  slug: '',
  params: { pageIndex: 0, search: '' },
  updatePathname: () => null,
  updateSlug: () => null,
  updatePageIndex: () => null,
  updateSearch: () => null,

}

const UrlProviderContext = createContext<UrlProviderState>(initialState)

export function UrlProvider({
  children,
  ...props
}: UrlProviderProps) {
  const [url, setUrl] = useState(new URL(window.location.href))

  const [pathname, setPathname] = useState('/')
  const [slug, setSlug] = useState('')
  const [params, setParams] = useState({
    pageIndex: 1,
    search: '',
  } as ParamsProps)

  function updateSlug(eventSlug: string) {
    setParams({
      pageIndex: 1,
      search: '',
    })
    setSlug(eventSlug)
    setPathname(`/evento/${eventSlug}/participantes`)

    const newUrl = url
    newUrl.searchParams.delete('page')
    newUrl.searchParams.delete('search')
    newUrl.pathname = `/evento/${eventSlug}/participantes`

    updateUrl(newUrl)
  }

  function updateUrl(newUrl: URL) {
    setUrl(newUrl)
    window.history.pushState({}, '', newUrl)
  }

  function updatePathname(newPathname: string) {
    setPathname(newPathname)
    setParams({
      pageIndex: 1,
      search: '',
    })

    const newUrl = new URL(url)
    newUrl.searchParams.delete('page')
    newUrl.searchParams.delete('search')
    newUrl.pathname = newPathname

    updateUrl(newUrl)  
  }


  function updatePageIndex(newPageIndex: number) {
    setParams({
      pageIndex: newPageIndex,
      search: params.search,
    })

    const newUrl = new URL(url)
    newUrl.searchParams.set('page', newPageIndex.toString())

    updateUrl(newUrl)
  }

  function updateSearch(newSearch: string) {
    setParams({
      search: newSearch,
      pageIndex: 1,
    
    })

    const newUrl = new URL(url)

    newUrl.searchParams.set('search', newSearch)
    newUrl.searchParams.set('page', '1'),

    updateUrl(newUrl)
  }

  const value = {
    url,
    pathname,
    params,
    slug,
    updatePathname,
    updateSlug,
    updatePageIndex,
    updateSearch,
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