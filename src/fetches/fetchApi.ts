interface FetchProps {
  url: URL
  init: RequestInit
}

interface FetchReturn {
  successfully: boolean
  data?: any
}

export async function FetchApi({ url, init }: FetchProps): Promise<FetchReturn> {

  const response = await fetch(url, init)

  console.log(response)

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