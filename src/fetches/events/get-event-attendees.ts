import { EventAttendeesType } from '..'
import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface RequestProps {
  slug: string
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  successfully: boolean
  message: string
  data?: {
    attendees: EventAttendeesType
    attendeesTotal: number
    checkInTotal: number
  }
}

export async function getEventAttendees({ slug, pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: `/get/event/${slug}/attendees`,
    pageIndex,
    search,
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully,
      message: 'Participantes do evento buscados com sucesso.',
      data: {
        attendees: data.attendees,
        attendeesTotal: data.attendeesTotal,
        checkInTotal: data.checkInTotal,
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
    message: 'Erro ao buscar os participantes do evento',
  }
} 