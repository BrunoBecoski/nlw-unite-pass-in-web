interface CreateRequestProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pageIndex?: number
  search?: string
  headers?: HeadersInit,
  body?: BodyInit
}

export class CreateRequest {
  private _url = new URL('http://localhost:3333')
  private _init: RequestInit = {}

  constructor ( { pathname, method, pageIndex, search, headers, body }: CreateRequestProps ) {
    this._url.pathname = pathname
    this._init.method = method
    
    if (pageIndex != undefined) {
      this._url.searchParams.set('pageIndex', pageIndex.toString())
    }
    
    if (search != undefined) {
      this._url.searchParams.set('query', search)
    }
    
    if (headers != undefined) {
      this._init.headers = headers
    }

    if (body != undefined) {
      this._init.body = body
    }
  }
        
  get url() {
    return this._url
  }

  get init() {
    return this._init
  }
}