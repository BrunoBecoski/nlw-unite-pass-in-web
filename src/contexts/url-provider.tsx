import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface UrlProviderProps {
  children: ReactNode
}

interface ParamsProps {
  pathname?: string
  slug?: string
  pageIndex?: number
  search?: string
}

type UrlProviderState = {
  pathname?: string,
  slug?: string,
  pageIndex?: number,
  search?: string,
  setParams: (params: ParamsProps) => void,
  setPathname: (pathname: string) => void,
  setSlug: (slug: string) => void,
  setPageIndex: (pageIndex: number) => void,
  setSearch: (search: string) => void,
}

const initialState: UrlProviderState = {
  setParams: () => null,
  setSlug: () => null,
  setPathname: () => null,
  setPageIndex: () => null,
  setSearch: () => null,
}

const UrlProviderContext = createContext<UrlProviderState>(initialState)

export function UrlProvider({
  children,
  ...props
}: UrlProviderProps) {
  const [params, setParams] = useState({} as ParamsProps)

  useEffect(() => {
    const url = new CreateUrl()

    if (params.pathname) {
      url.setPathname = String(params.pathname)
    }

    history.pushState({}, '', url.getUrl)
  }, [params])

  function setPathname(pathname: string) {
    setParams({ 
      ...params,
      pathname,
    })
  }

  function setSlug(slug: string) {
    setParams({ 
      ...params,
      slug,
    })
  }

  function setPageIndex(pageIndex: number) {
    setParams({
      ...params,
      pageIndex,
    })
  }

  function setSearch(search: string) {
    setParams({
      ...params,
      search,
    })
  }

  
  const value = {
    setParams,
    params,
    slug: params.slug,
    setSlug,
    pathname: params.pathname,
    setPathname,
    pageIndex: params.pageIndex,
    setPageIndex,
    search: params.search,
    setSearch,
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