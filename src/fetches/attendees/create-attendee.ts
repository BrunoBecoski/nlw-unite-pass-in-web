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
  data?: {
    attendee: AttendeeTypes
  }
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
      message: 'Participante criado com sucesso.',
      data: {
        attendee: data,
      }
    }
  }

  if (message != undefined) {
    return {
      successfully: false,
      message,
      data: undefined,
    }
  }

  return {
    successfully: false,
    message: 'Não foi possível criar o participante.',
    data: undefined,
  }
}