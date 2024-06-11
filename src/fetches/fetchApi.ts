interface FetchApiRequest {
  url: URL
  init: RequestInit
}

interface FetchApiResponse {
  successfully: boolean
  message: string
  data: any
}

export async function fetchApi({ url, init }: FetchApiRequest): Promise<FetchApiResponse> {
  try {
    const response = await fetch(url, init)

    const data = await response.json()

    if (response.ok == true) {
      return {
        successfully: true,
        message: response.statusText,
        data,
      }
    }

    return {
      successfully: false,
      message: data,
      data: undefined
    }
  } catch (error) {
    return {
      successfully: false,
      message: 'Erro no servidor.',
      data: undefined,
    }
  }
}