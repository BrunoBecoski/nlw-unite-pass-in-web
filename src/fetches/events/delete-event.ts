import { CreateRequest } from "../../classes/createRequest"
import { fetchApi } from "../fetchApi"

interface DeleteEventRequest {
  id: string
}

interface DeleteEventResponse {
  successfully: boolean 
  message: string
}

export async function deleteEvent({ id }: DeleteEventRequest): Promise<DeleteEventResponse> {
  const { url, init } = new CreateRequest({
    method: 'DELETE',
    pathname: `/delete/event/${id}`,
  })
  
  const { successfully, message } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Evento deletado com sucesso.',
    }
  }

  return {
    successfully,
    message,
  }
}