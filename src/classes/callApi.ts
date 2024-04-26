import { CreateRequest } from './createRequest'

interface getEventsProps {
  pageIndex?: number
  search?: string
}

interface getEventAttendeesProps {
  eventSlug: string
  pageIndex?: number
  search?: string
}

export class CallApi {
  constructor() {
    this.getEvents = this.getEvents.bind(this)
    this.getEventAttendees = this.getEventAttendees.bind(this)
    this.fetchApi = this.fetchApi.bind(this)
  }

  async getEvents({ pageIndex = 1, search = '' }: getEventsProps = {}) {
    const request = new CreateRequest()
    request.setPathname = '/events'
    request.setPageIndex = pageIndex.toString()
    request.setSearch = search
    request.setMethod = 'GET'

    const events = await this.fetchApi(request.info)

    return events
  }

  async getEventAttendees({ eventSlug, pageIndex = 1, search = '' }: getEventAttendeesProps) {
    
    const request = new CreateRequest()

    request.setPathname = `/events/${eventSlug}/attendees`
    request.setPageIndex = String(pageIndex)
    request.setSearch = search
    
    const eventAttendees = await this.fetchApi(request.info)

    return eventAttendees
  }

  private async fetchApi(info: { url: URL; init: RequestInit }) {
    const response =  fetch(info.url, info.init)
      .then(response => response.json())
      .catch(error => console.log(error)) 

    return response
  }
}

