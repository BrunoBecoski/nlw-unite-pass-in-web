import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface CreateEventAttendeeRequest {
  slug: string
  code: string
}

interface CreateEventAttendeeResponse {
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

export async function createEventAttendee({ slug, code }: CreateEventAttendeeRequest): Promise<CreateEventAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    pathname: `/create/event/${slug}/attendee/${code}`,
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