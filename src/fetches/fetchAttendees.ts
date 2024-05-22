import { CreateRequest } from '../classes/createRequest'
import { AttendeeTypes } from './index'

interface RequestProps {
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  attendees: AttendeeTypes[]
  total: number
}

export async function FetchAttendees({ pageIndex, search }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    pathname: '/attendees',
    method: 'GET',
    pageIndex,
    search,
  })

  const response: ResponseProps = await fetch(url, init)
    .then(response => response.json())
    .catch(error => console.log(error))
  
  return response
}