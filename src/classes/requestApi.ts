export type EventTypes = {
  id: string
  slug: string
  title: string
  details: string
  attendees: number
  maximumAttendees: number
  startDate: string,
  endDate: string,
  virtualEvent: boolean,
  physicalEvent: boolean,
  checkInAfterStart: boolean
}

export type AttendeeTypes = {
  id: string
  name: string
  email: string
}

interface GetEventsResponse {
  events: EventTypes[]
  total: number
}

interface GetAttendeesResponse {
  attendees: AttendeeTypes[]
  total: number
}

interface RequestApiProps {
  pageIndex?: number
  search?: string
}

export class RequestApi {
  private _pageIndex: number | undefined
  private _search: string | undefined

  constructor({ pageIndex, search }: RequestApiProps) {
    this._pageIndex = pageIndex
    this._search = search

    this.getEvents = this.getEvents.bind(this)
    this.getAttendees = this.getAttendees.bind(this)
  }

  async getEvents() {
    const { url, init } = new CreateRequest({
      pathname: '/events',
      method: 'GET',
      pageIndex: this._pageIndex,
      search: this._search,
    })

    const events: GetEventsResponse = await fetch(url, init)
      .then(response => response.json())
      .catch(error => console.log(error))
      
    return events
  }

  async getAttendees() {
    const { url, init } = new CreateRequest({
      pathname: '/attendees',
      method: 'GET',
      pageIndex: this._pageIndex,
      search: this._search,
    }) 
  
    const attendees: GetAttendeesResponse = await fetch(url, init)
      .then(response => response.json())
      .catch(error => console.log(error))

    return attendees
  }
}

interface CreateRequestProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pageIndex?: number
  search?: string
}

class CreateRequest {
  private _url = new URL('http://localhost:3333')
  private _init: RequestInit = {}

  constructor ( { pathname, method, pageIndex, search }: CreateRequestProps ) {
    this._url.pathname = pathname
    if (pageIndex) {
      this._url.searchParams.set('pageIndex', pageIndex.toString())
    }
    if (search) {
      this._url.searchParams.set('query', search)
    }
    this._init.method = method
  }

  get url() {
    return this._url
  }

  get init() {
    return this._init
  }
}