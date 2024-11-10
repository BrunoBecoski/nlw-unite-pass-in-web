import { EventAndAttendeesType } from ".."
import { CreateRequest } from "../../classes/createRequest"
import { fetchApi } from "../fetchApi"

interface RequestProps {
  slug: string
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  successfully: boolean 
  message: string
  data?: {
    event: EventAndAttendeesType
  }
}

export async function getEvent({ slug, pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: `/get/event/${slug}`,
    pageIndex,
    search,
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully,
      message: 'Evento buscado com sucesso.',
      data: {
        event: data.event,
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
    message: 'Erro ao buscar o evento',
    data: undefined,
  }
}