import { ReactNode, createContext, useContext, useState } from 'react'

import { CreateUrl } from '../classes/createUrl'

interface RouterProviderProps {
  children: ReactNode
}

type RouterProviderState = {
  currentRoute: Routes,
  slug: string,
  pageIndex: number,
  search: string,
  toHome: () => void,
  toEvents: () => void,
  toEventSlugAttendee: (slug: string) => void,
}

const initialState: RouterProviderState = {
  currentRoute: 'home',
  slug: '',
  pageIndex: 1,
  search: '',
  toHome: () => null,
  toEvents: () => null,
  toEventSlugAttendee: () => null,
}

type Routes = 'home' | 'events' | 'eventSlugAttendee'

type ParamsProps = {
  pathname: string
  slug?: string
  pageIndex?: number
  search?: string
}

const RouterProviderContext = createContext<RouterProviderState>(initialState)

function setInitialParams() {
  const url = new CreateUrl()

  const pathname = url.getPathname
  const pageIndex = Number(url.getPageIndex)
  const search = url.getSearch
  const slug = getSlug(pathname)

  let params: ParamsProps = {
    pathname: pathname,
  }

  if (slug != null) {
    params.slug = slug
  }

  if (pageIndex != null) {
    params.pageIndex = pageIndex
  }

  if (search != null) {
    params.search = search
  }

  return params
}

function getSlug(pathname: string) {
  const array = pathname.substring(1).split('/')

  if (array[0] === 'evento' && array[2] === 'participantes') {
    return array[1]
  }

  return null
}

export function RouterProvider({
  children,
  ...props
}: RouterProviderProps) {
  const [currentRoute, setCurrentRoute] = useState<Routes>('home')
  const [params, setParams] = useState<ParamsProps>(setInitialParams())

  function toHome() {
    const url = new CreateUrl()

    url.setPathname = '/'
    
    setCurrentRoute('home')
    setParams({
      pathname: '/',
    })
    history.pushState({}, '', url.getUrl)
  }

  function toEvents() {
    const url = new CreateUrl()

    url.setPathname = '/eventos'

    setCurrentRoute('events')
    setParams({
      pathname: '/eventos',
    })
    history.pushState({}, '', url.getUrl)
  }

  function toEventSlugAttendee(slug: string) {
    const url = new CreateUrl()

    const pathname = `/evento/${slug}/participantes`


    url.setPathname = pathname

    setCurrentRoute('eventSlugAttendee')
    setParams({
      pathname,
    })
    history.pushState({}, '', url.getUrl)
  }

  const value: RouterProviderState = {
    currentRoute,
    slug: params.slug ? params.slug : '',
    pageIndex: params.pageIndex ? params.pageIndex : 1,
    search: params.search ? params.search : '',
    toHome,
    toEvents,
    toEventSlugAttendee,
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