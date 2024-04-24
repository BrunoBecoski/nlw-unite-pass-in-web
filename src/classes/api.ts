import { CreateUrl } from './createUrl'

interface getEventsProps {
  pageIndex?: number
  search?: string
}

interface getEventAttendeesProps {
  eventId: string
  pageIndex?: number
  search?: string
}

export class Api {
  constructor() {
    this.getEvents = this.getEvents.bind(this)
    this.getEventAttendees = this.getEventAttendees.bind(this)
    this.fetchGet = this.fetchGet.bind(this)
  }

  async getEvents({ pageIndex, search }: getEventsProps = {}) {
    const url = new CreateUrl()
    url.setPathname = '/events'
    url.setPageIndex = String(pageIndex)
    url.setSearch = search

    const events = await this.fetchGet(url.getUrl)

    return events
  }

  async getEventAttendees({ eventId, pageIndex, search }: getEventAttendeesProps) {
    
    const url = new CreateUrl()

    url.setPathname = `/events/${eventId}/attendees`
    url.setPageIndex = String(pageIndex)
    url.setSearch = search
    
    const eventAttendees = await this.fetchGet(url.getUrl)

    return eventAttendees
  }

  private async fetchGet(url: URL) {
    const response =  fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .catch(error => console.log(error)) 

    return response
  }
}