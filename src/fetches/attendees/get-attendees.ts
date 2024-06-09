import { CreateRequest } from '../../classes/createRequest'
import { FetchApi } from '../fetchApi'
import { AttendeeTypes } from '../'

interface RequestProps {
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  attendees: AttendeeTypes[]
  total: number
}

export async function getAttendee({ pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: '/get/attendees',
    pageIndex,
    search, 
  })

  const response = await FetchApi({ url, init })
  
  if (response.successfully === false) {
    return { 
      attendees: [],
      total: 0,
    }
  }

  return {
    attendees: response.data.attendees,
    total: response.data.total,    
  }
}