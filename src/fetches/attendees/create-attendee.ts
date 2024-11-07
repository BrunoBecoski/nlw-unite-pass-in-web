import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'
import { AttendeeTypes } from '../'

interface CreateAttendeeRequest {
  name: string
  email: string
}

interface CreateAttendeeResponse {
  successfully: boolean 
  message: string
  attendee?: AttendeeTypes
}

export async function createAttendee({ name, email }: CreateAttendeeRequest): Promise<CreateAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    pathname: '/create/attendee',
    body: JSON.stringify({
      name,
      email,
    })
  })
  
  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Participante criado com sucesso!',
      attendee: data.attendee,
    }
  }

  return {
    message,
    successfully,
    attendee: undefined,
  }
}