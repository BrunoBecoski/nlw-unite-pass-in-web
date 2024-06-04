import { FetchApi } from './fetchApi'
import { AttendeeTypes } from './index'

interface RequestProps {
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  attendees: AttendeeTypes[]
  total: number
}

export async function FetchAttendees({ pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const response = await FetchApi({  
    method: 'GET',
    pathname: '/get/attendees',
    pageIndex,
    search, 
  })
  
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