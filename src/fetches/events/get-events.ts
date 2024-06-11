import { EventTypes } from '../index'
import { fetchApi } from '../fetchApi'
import { CreateRequest } from '../../classes/createRequest'

interface RequestProps {
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

export async function getEvents({ pageIndex, search }: RequestProps): Promise<ResponseProps>{
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: '/events',
    pageIndex,
    search,
  })

  const { successfully, message, data } = await fetchApi({ url, init })
  
  if (successfully == true) {
    return {
      successfully,
      message: 'Eventos buscados com sucesso.',
      data: {
        events: data.events,
        total: data.total
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