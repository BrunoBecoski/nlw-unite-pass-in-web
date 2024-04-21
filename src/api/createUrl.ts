export class CreateUrl {
  private url = new URL('http://localhost:3333')
  
  set setPathname(pathname: string | undefined) {
    this.url.pathname = pathname || '/'
  }

  set setPageIndex(pageIndex: string | undefined)  {
    this.url.searchParams.set('pageIndex', pageIndex || '1')
  }

  set setSearch(search: string | undefined) {
    this.url.searchParams.set('query', search || '')
  }

  get getUrl() {
    return this.url
  }
}