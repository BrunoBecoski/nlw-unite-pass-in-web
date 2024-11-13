interface FetchApiRequest {
  url: URL
  init: RequestInit
}

interface FetchApiResponse {
  successfully: boolean
  message: string
  data?: any
}

export async function fetchApi({ url, init }: FetchApiRequest): Promise<FetchApiResponse> {
  try {
    const response = await fetch(url, init)

    if (init.method == 'DELETE') {
      if (response.ok == true) {
        return {
          successfully: true,
          message: response.statusText,
        }
      }
    }

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
      message: data.message,
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