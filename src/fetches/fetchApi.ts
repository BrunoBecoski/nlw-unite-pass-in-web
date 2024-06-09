interface FetchApiRequest {
  url: URL
  init: RequestInit
}

interface FetchApiResponse {
  successfully: boolean
  message?: string
  data?: any
}

export async function fetchApi({ url, init }: FetchApiRequest): Promise<FetchApiResponse> {

  const response = await fetch(url, init)

  const data = await response.json()

  if (response.ok == true) {
    return {
      successfully: true,
      data,
    }
  }

  return {
    successfully: false,
    message: data,
  }
}