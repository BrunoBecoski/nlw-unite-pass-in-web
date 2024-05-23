import { FetchApi } from './fetchApi'
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
  const response = await FetchApi({
    method: 'GET',
    pathname: '/events',
    pageIndex,
    search,
  })
  
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