import { CreateRequest } from '../classes/createRequest'
import { EventTypes } from './index'

interface RequestProps {
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  events: EventTypes[]
  total: number
}

export async function FetchEvents({ pageIndex, search }: RequestProps): Promise<ResponseProps>{
  const { url, init } = new CreateRequest({
    pathname: '/events',
    method: 'GET',
    pageIndex,
    search,
  })

  const response: ResponseProps = await fetch(url, init)
    .then(response => response.json())
    .catch(error => console.log(error))
  
  return response
}