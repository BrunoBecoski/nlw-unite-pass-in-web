export class CreateUrl {
  private _url = new URL(window.location.origin)

  set pathname(pathname: string) {
    this._url.pathname = pathname
  }

  set pageIndex(pageIndex: string) {
    this._url.searchParams.set('pageIndex', pageIndex)
  }

  set search(search: string) {
    this._url.searchParams.set('search', search)
  }

  get url() {
    return this._url
  }
}