import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface DeleteEventAttendeeRequest {
  slug: string
  code: string
}

interface DeleteEventAttendeeResponse {
  successfully: boolean
  message: string
}

export async function deleteEventAttendee({ slug, code }: DeleteEventAttendeeRequest): Promise<DeleteEventAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    pathname: `/delete/event/${slug}/attendee/${code}`,
  })

  const { successfully, message } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Participante retirado do evento com sucesso.'
    }
  }

  return {
    successfully: false,
    message,
  }
}