interface CreateUrlProps {
  pathname?: string
  pageIndex?: number
  search?: string
  slug?: string
}

export class CreateUrl {
  private _url = new URL(window.location.href)

  constructor (props?: CreateUrlProps) {
    if (props == undefined) {
      return
    }

    const {
      pageIndex,
      pathname,
      search,
      slug,
    } = props

    if (pathname != undefined) {
      this._url.pathname = pathname
    }
    
    if (pageIndex != undefined) {
      this._url.searchParams.set('page', pageIndex.toString())  
    } else {
      this._url.searchParams.delete('page')
    }

    if (search != undefined) {
      this._url.searchParams.set('search', search)
    } else {
      this._url.searchParams.delete('search')
    }

    if (slug != undefined) {
      this._url.pathname = `/evento/${slug}`
    }
  }

  set setPathname(pathname: string) {
    this._url.pathname = pathname
  }

  set setPageIndex(pageIndex: number) {
    this._url.searchParams.set('page', pageIndex.toString())
  }

  set setSearch(search: string) {
    if (search.length === 0) {
      this._url.searchParams.delete('search')
    } else {
      this._url.searchParams.set('search', search)
    }
  }

  get pathname() {
    return this._url.pathname
  }

  get pageIndex() {
    const pageIndex = this._url.searchParams.get('page')

    if (pageIndex != null) {
      return Number(pageIndex)
    } else {
      return undefined
    }
  }

  get search() {
    const search = this._url.searchParams.get('search')

    if (search != null) {
      return search
    } else {
      return undefined
    }
  }

  get url() {
    return this._url
  }
}