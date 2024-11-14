import { CreateRequest } from "../../classes/createRequest"
import { fetchApi } from "../fetchApi"

interface DeleteAttendeeRequest {
  id: string
}

interface DeleteAttendeeResponse {
  successfully: boolean
  message: string
}

export async function deleteAttendee({ id }: DeleteAttendeeRequest): Promise<DeleteAttendeeResponse> {
  const { url, init } = new CreateRequest({
    method: 'DELETE',
    pathname: `/delete/attendee/${id}`,
  })

  const { successfully, message } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Participante deletado com sucesso.'
    }
  }

  return {
    successfully,
    message
  }
}