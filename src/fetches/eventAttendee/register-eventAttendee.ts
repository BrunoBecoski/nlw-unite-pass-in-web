import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface RegisterEventAttendeeRequest {
  slug: string
  code: string
}

interface RegisterEventAttendeeResponse {
  successfully: boolean
  message: string
  data?: {
    eventAttendee: {
      eventId: string
      attendeeId: string
      checkIn: boolean
      createdAt: Date
    } 
  }
}

export async function registerEventAttendee({ slug, code }: RegisterEventAttendeeRequest): Promise<RegisterEventAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    pathname: `/register/event/${slug}/attendee/${code}`,
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true || data != undefined) {
    return {
      successfully: true,
      message: 'Participante registrado no evento com sucesso.',
      data: {
        eventAttendee: data.eventAttendee,
      }
    }
  }

  return {
    successfully: false,
    message,
    data: undefined,
  }
}