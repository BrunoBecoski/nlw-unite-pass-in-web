interface CreateRequestProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pageIndex?: number
  search?: string
}

export class CreateRequest {
  private _url = new URL('http://localhost:3333')
  private _init: RequestInit = {}

  constructor ( { pathname, method, pageIndex, search }: CreateRequestProps ) {
    this._url.pathname = pathname
    this._init.method = method

    if (pageIndex != undefined) {
      this._url.searchParams.set('pageIndex', pageIndex.toString())
    }

    if (search != undefined) {
      this._url.searchParams.set('query', search)
    }
  }

  set pageIndex(pageIndex: number) {
    this._url.searchParams.set('pageIndex', pageIndex.toString())
  }

  set search(search: string) {
    this._url.searchParams.set('query', search)
  }

  get url() {
    return this._url
  }

  get init() {
    return this._init
  }
}