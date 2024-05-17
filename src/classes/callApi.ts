import { CreateRequest } from './createRequest'

interface getEventsProps {
  pageIndex?: number
  search?: string
}

interface getAttendeesProps {
  pageIndex?: number
  search?: string
}

interface getEventAttendeesProps {
  slug: string
  pageIndex?: number
  search?: string
}

export class CallApi {
  async getEvents({ pageIndex = 1, search = '' }: getEventsProps = {}) {
    const request = new CreateRequest()
    request.setPathname = '/events'
    request.setPageIndex = pageIndex.toString()
    request.setSearch = search
    request.setMethod = 'GET'

    const { info } = request
    const { url, init } = info
  
    const events =  fetch(url, init)
      .then(response => response.json())
      .catch(error => console.log(error))

    return events
  }

  async getAttendees({ pageIndex = 1, search = ''}: getAttendeesProps = {}) {
    const request = new CreateRequest()
    request.setPathname = '/attendees'
    request.setPageIndex = pageIndex.toString()
    request.setSearch = search
    request.setMethod = 'GET'

    const { info } = request
    const { url, init } = info
  
    const attendees =  fetch(url, init)
      .then(response => response.json())
      .catch(error => console.log(error))

    return attendees
  }

  async getEventAttendees({ slug, pageIndex = 1, search = '' }: getEventAttendeesProps) {
    
    const request = new CreateRequest()

    request.setPathname = `/events/${slug}/attendees`
    request.setPageIndex = String(pageIndex)
    request.setSearch = search
    
    const { info } = request
    const { url, init } = info

    const eventAttendees =  fetch(url, init)
      .then(response => response.json())
      .catch(error => console.log(error))

    return eventAttendees
  }
}

