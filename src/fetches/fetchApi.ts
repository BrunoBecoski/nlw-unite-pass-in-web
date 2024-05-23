import { CreateRequest } from '../classes/createRequest'

interface FetchProps {
  pathname: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pageIndex?: number
  search?: string
}

interface FetchReturn {
  successfully: boolean
  data?: any
}

export async function FetchApi({ pathname, method, pageIndex, search }: FetchProps): Promise<FetchReturn> {
  const { url, init } = new CreateRequest({
    method,
    pathname,
    pageIndex,
    search
  })

  const response = await fetch(url, init)

  if (response.ok === false) {
    return { 
      successfully: false
    }
  } 

  const data = await response.json().then()

  return {
    successfully: true,
    data,
  }
}