export class CreateUrl {
  private _url = new URL(window.location.href)

  set setPathname(pathname: string) {
    this._url.pathname = pathname
  }

  get getPathname() {
    return this._url.pathname
  }

  set setPageIndex(pageIndex: string) {
    this._url.searchParams.set('pageIndex', pageIndex)
  }

  get getPageIndex() {
    return this._url.searchParams.get('pageIndex')
  }

  set setSearch(search: string) {
    if (search.length === 0) {
      this._url.searchParams.delete('search')
    } else {
      this._url.searchParams.set('search', search)
    }
  }

  get getSearch() {
    return this._url.searchParams.get('search')
  }

  get getUrl() {
    return this._url
  }
}