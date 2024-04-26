export class CreateRequest {
  private _url = new URL('http://localhost:3333')
  private _init: RequestInit = {}

  set setPathname(pathname: string) {
    this._url.pathname = pathname
  }

  set setPageIndex(pageIndex: string)  {
    this._url.searchParams.set('pageIndex', pageIndex)
  }

  set setSearch(search: string) {
    this._url.searchParams.set('query', search)
  }

  set setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    this._init.method = method
  }

  get info() {
    return {
      url: this._url,
      init: this._init,
    }
  }
}