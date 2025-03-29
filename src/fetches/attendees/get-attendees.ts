import { CreateRequest } from '../../classes/createRequest'
import { AttendeesTypes } from '../'
import { fetchApi } from '../fetchApi'

interface GetAttendeeRequest {
  pageIndex?: number
  search?: string
}

interface GetAttendeeResponse {
  successfully: boolean 
  message: string
  data?: {
    attendees: AttendeesTypes[]
    total: number
  }
}

export async function getAttendees({ pageIndex, search }: GetAttendeeRequest): Promise<GetAttendeeResponse> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: '/get/attendees',
    pageIndex,
    search, 
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully,
      message: 'Participantes buscados com sucesso.',
      data: {
        attendees: data.attendees,
        total: data.total,
       }
    }
  }

  if (message != undefined) {
    return {
      successfully: false,
      message: message,
      data: undefined,
    }
  }

  return {
    successfully: false,
    message: 'Erro ao buscar os participantes',
    data: undefined,
  }
}