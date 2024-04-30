import { ReactNode, createContext, useContext, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface UrlProviderProps {
  children: ReactNode
}

interface paramsProps {
  pathname?: string
  slug?: string
  pageIndex?: number
  search?: string
}

type UrlProviderState = {
  pathname?: string,
  setPathname: (pathname: string) => void,
  slug?: string,
  setSlug: (slug: string) => void,
  pageIndex?: number,
  setPageIndex: (pageIndex: number) => void,
  search?: string,
  setSearch: (search: string) => void,
}

const initialState: UrlProviderState = {
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
  const [params, setParams] = useState({} as paramsProps)

  function setPathname(pathname: string) {
    console.log(params)
    setParams({ 
      ...params,
      pathname,
    })
    console.log(params)
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