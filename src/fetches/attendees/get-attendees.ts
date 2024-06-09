import { CreateRequest } from '../../classes/createRequest'
import { AttendeeTypes } from '../'
import { fetchApi } from '../fetchApi'

interface GetAttendeeRequest {
  pageIndex?: number
  search?: string
}

interface GetAttendeeResponse {
  successfully: boolean 
  message?: string
  data?: {
    attendees: AttendeeTypes[]
    total: number
  }
}

export async function getAttendee({ pageIndex, search }: GetAttendeeRequest): Promise<GetAttendeeResponse> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: '/get/attendees',
    pageIndex,
    search, 
  })

  const response = await fetchApi({ url, init })

  if (response.successfully == true) {
    return {
      successfully: true,
      data: {
        attendees: response.data.attendees,
        total: response.data.total,
       }
    }
  }

  if (response.message != undefined) {
    return {
      successfully: false,
      message: response.message,
    }
  }

  return {
    successfully: false,
    message: 'Não foi possível buscar os participantes',
  }
}