import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'
import { EventTypes } from '../'

interface UpdateEventRequest {
  id: string
  title: string
  details: string
  maximumAttendees: number
  startDate: Date
  endDate: Date
}

interface UpdateEventResponse {
  successfully: boolean 
  message: string
  event?: EventTypes
}

export async function updateEvent({ id, title, details, maximumAttendees, endDate, startDate }: UpdateEventRequest): Promise<UpdateEventResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    pathname: '/update/event',
    body: JSON.stringify({
      id,
      title,
      details,
      maximumAttendees,
      startDate,
      endDate,
    })
  })

  const { successfully, message, data } = await fetchApi({ url,  init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Evento atualizado com sucesso!',
      event: data.updatedEvent,
    }
  }

  return {
    successfully,
    message,
    event: undefined
  }
}