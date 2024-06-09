import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'
import { AttendeeTypes } from '../'

interface CreateAttendeeRequest {
  name: string
  email: string
}

interface CreateAttendeeResponse {
  successfully: boolean 
  message?: string
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
  
  const response = await fetchApi({ url, init })

  if (response.successfully == true) {
    return {
      successfully: true,
      message: 'Participante criado com sucesso',
      attendee: response.data,
    }
  }

  if (response.message != undefined) {
    return {
      successfully: false,
      message: response.message,
    }
  }

  return {
    successfully: false,
    message: 'Não foi possível cria criar o participante'
  }
}