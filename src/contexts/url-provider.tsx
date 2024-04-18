import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface UrlProviderProps {
  children: ReactNode
}

type UrlProviderState = {
  pathname: string
  setPathname: (pathname: string) => void
}

const initialState: UrlProviderState = {
  pathname: '/',
  setPathname: () => null,
}

const UrlProviderContext = createContext<UrlProviderState>(initialState)

export function UrlProvider({
  children,
  ...props
}: UrlProviderProps) {
  const [pathname, setPathname] = useState(window.location.pathname)

  const value = {
    pathname,
    setPathname,
  }

  useEffect(() => {
    window.history.pushState({}, '', new URL(pathname, window.location.href))  
  }, [pathname])

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