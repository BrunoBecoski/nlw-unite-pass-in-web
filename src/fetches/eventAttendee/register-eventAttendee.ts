import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface RegisterEventAttendeeRequest {
  slug: string
  code: string
}

interface RegisterEventAttendeeResponse {
  successfully: boolean
  message: string
}

export async function registerEventAttendee({ slug, code }: RegisterEventAttendeeRequest): Promise<RegisterEventAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    pathname: `/register/event/${slug}/attendee/${code}`,
  })

  const { successfully, message } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Participante registrado no evento com sucesso.'
    }
  }

  if (message != undefined) {
    return {
      successfully: false,
      message,
    }
  }

  return {
    successfully: false,
    message: 'Não foi possível registrar o participante no evento.'
  }
}