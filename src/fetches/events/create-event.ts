import { CreateRequest } from '../../classes/createRequest'
import { fetchApi } from '../fetchApi'
import { EventTypes} from '..'

interface CreateEventRequest {
  title: string
  details: string
  maximumAttendees: number
  startDate: string
  endDate: string
}

interface CreateEventResponse {
  successfully: boolean 
  message: string
  event?: EventTypes
}

export async function createEvent({ title, details, maximumAttendees, startDate, endDate }: CreateEventRequest): Promise<CreateEventResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    pathname: '/create/event',
    body: JSON.stringify({
      title,
      details,
      maximumAttendees,
      startDate,
      endDate,
    })
  })
  
  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Evento criado com sucesso.',
      event: data.event,
    }
  }

  return {
    successfully: false,
    message: 'Não foi possível criar o evento.',
    event: undefined,
  }
}