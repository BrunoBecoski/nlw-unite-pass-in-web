import { EventTypes } from '..'
import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface RequestProps {
  code: string
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  successfully: boolean
  message: string
  data?: {
    events: EventTypes[]
    total: number
  }
}

export async function getAttendeeEvents({ code, pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: `/get/attendee/${code}/events`,
    pageIndex,
    search,
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully,
      message: 'Eventos do participante buscados com sucesso.',
      data: {
        events: data.events,
        total: data.total,
      }
    }
  }

  if (message != undefined)  {
    return {
      successfully: false,
      message: message,
      data: undefined,
    }
  }

  return {
    successfully: false,
    message: 'Erro ao buscar os eventos do participante',
  }
}