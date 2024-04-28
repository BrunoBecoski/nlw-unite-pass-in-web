import { ReactNode, createContext, useContext, useState } from "react";

interface UrlProviderProps {
  children: ReactNode
}

interface UrlInfoProps {
  pathname: string[]
  slug: string
  pageIndex: number
  search: string
}

type UrlProviderState = {
  slug: string,
  setSlug: (slug: string) => void,
  pathname: string[],
  setPathname: (pathname: string) => void,
  pageIndex: number,
  setPageIndex: (pageIndex: number) => void,
  search: string,
  setSearch: (search: string) => void,
}

const initialState: UrlProviderState = {
  slug: '',
  setSlug: () => null,
  pathname: [''],
  setPathname: () => null,
  pageIndex: 0,
  setPageIndex: () => null,
  search: '',
  setSearch: () => null,
}

const UrlProviderContext = createContext<UrlProviderState>(initialState)

export function UrlProvider({
  children,
  ...props
}: UrlProviderProps) {
  const [url, setUrl] = useState(new URL(window.location.href))
  const [urlInfo, setUrlInfo] = useState({} as UrlInfoProps)

  function setPathname(pathname: string) {
    const formattedPathname = pathname.substring(1).split('/')

    setUrlInfo({ 
      ...urlInfo,
      pathname: formattedPathname,
     })
  }

  function setSlug(slug: string) {
    setUrlInfo({ 
      ...urlInfo,
      slug,
    })
  }

  function setPageIndex(pageIndex: number) {
    setUrlInfo({
      ...urlInfo,
      pageIndex,
    })
  }

  function setSearch(search: string) {
    setUrlInfo({
      ...urlInfo,
      search,
    })
  }

  
  const value = {
    urlInfo,
    slug: urlInfo.slug,
    setSlug,
    pathname: urlInfo.pathname ? urlInfo.pathname : [''],
    setPathname,
    pageIndex: urlInfo.pageIndex,
    setPageIndex,
    search: urlInfo.search,
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