import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'
import { AttendeeTypes } from '../'

interface UpdateAttendeeRequest {
  id: string
  name: string
  email: string
}

interface UpdateAttendeeResponse {
  successfully: boolean
  message: string
  attendee?: AttendeeTypes
}

export async function updateAttendee({ id, name, email }: UpdateAttendeeRequest): Promise<UpdateAttendeeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    pathname: '/update/attendee',
    body: JSON.stringify({
      id,
      name,
      email,
    })
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Participante atualizado com sucesso!',
      attendee: data.updatedAttendee,
    }
  } 

  return {
    successfully,
    message,
    attendee: undefined
  }
}
