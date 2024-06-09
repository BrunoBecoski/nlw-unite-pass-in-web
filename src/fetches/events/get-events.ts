import { EventTypes } from '../index'
import { fetchApi } from '../fetchApi'
import { CreateRequest } from '../../classes/createRequest'

interface RequestProps {
  pageIndex?: number
  search?: string
}

interface ResponseProps {
  events: EventTypes[]
  total: number
}

export async function getEvents({ pageIndex, search }: RequestProps): Promise<ResponseProps>{
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: '/events',
    pageIndex,
    search,
  })

  const response = await fetchApi({ url, init })
  
  if (response.successfully === false) {
    return { 
      events: [],
      total: 0,
    }
  }

  return {
    events: response.data.events,
    total: response.data.total,    
  }
}