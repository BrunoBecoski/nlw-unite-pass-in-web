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
  private host = ('http://localhost:3333')

  constructor() {
    this.getEvents = this.getEvents.bind(this)
    this.getEventAttendees = this.getEventAttendees.bind(this)
    this.fetchGet = this.fetchGet.bind(this)
  }

  async getEvents({ pageIndex, search }: getEventsProps = {}) {
    const url = new URL(this.host)

    url.pathname = '/events'

    if (pageIndex) {
      url.searchParams.set('pageIndex', String(pageIndex))
    }

    if (search) {
      url.searchParams.set('query', search)
    }

    const events = await this.fetchGet(url)

    return events
  }

  async getEventAttendees({ eventId, pageIndex, search }: getEventAttendeesProps) {
    const url = new URL(this.host)

    url.pathname = `/events/${eventId}/attendees`

    if (pageIndex) {
      url.searchParams.set('pageIndex', String(pageIndex))
    }

    if (search) {
      url.searchParams.set('query', search)
    }

    const eventAttendees = await this.fetchGet(url)

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