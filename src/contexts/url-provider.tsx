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
  const [params, setParams] = useState<ParamsProps>(initialValues())

  function initialValues() {
    const url = new CreateUrl()

    const initialPathname = url.getPathname
    const initialPageIndex = Number(url.getPageIndex)
    const initialSearch = url.getSearch

    let initialValue: ParamsProps = {
      pathname: initialPathname
    }

    const initialSlug = getSlug(initialPathname)

    if (initialSlug !== null) {
      initialValue.slug = initialSlug
    }

    if (initialPageIndex !== null && initialPageIndex > 0) {
      initialValue.pageIndex = initialPageIndex
    } else {
      initialValue.pageIndex = 1
    }

    if (initialSearch != null) {
      initialValue.search = initialSearch
    }

    return initialValue
  }

  function getSlug(pathname: string) {
    const array = pathname.substring(1).split('/');

    if (array[0] === 'evento' && array[2] === 'participantes') {
      return array[1]
    }

    return null
  }

  useEffect(() => {
    const url = new CreateUrl()

    const pathname = params.pathname
    const pageIndex = params.pageIndex
    const search = params.search

    if (pathname != undefined) {
      url.setPathname = pathname
    }
    
    if (pageIndex != undefined && pageIndex != 0) {
      url.setPageIndex = pageIndex.toString()
    }
    
    if (search != undefined) {
      url.setSearch = search
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