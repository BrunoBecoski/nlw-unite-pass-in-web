import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'

interface CheckInEventAttendeeRequest {
  eventId: string,
  attendeeId: string,
}

interface CheckInEventAttendeeResponse {
  successfully: boolean 
  message: string
}

export async function checkInEventAttendee({ eventId, attendeeId }: CheckInEventAttendeeRequest): Promise<CheckInEventAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    pathname: `/check-in/event/${eventId}/attendee/${attendeeId}`,
  })
  
  const { successfully, message } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Check-in criado com sucesso.',
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
    message: 'Não foi possível criar o check-in.',
  }
}