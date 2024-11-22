import { CreateRequest } from "../../classes/createRequest"
import { fetchApi } from "../fetchApi"

interface UpdateAttendeeCodeRequest {
  id: string
}

interface UpdateAttendeeCodeResponse {
  successfully: boolean 
  message: string
  code?: string
}

export async function updateAttendeeCode({ id }: UpdateAttendeeCodeRequest): Promise<UpdateAttendeeCodeResponse> {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    pathname: `/update/attendee/code/${id}`
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully: true,
      message: 'Código do participante atualizado com sucesso!',
      code: data.code,
    }
  }

  return {
    successfully,
    message,
    code: undefined,
  }
}