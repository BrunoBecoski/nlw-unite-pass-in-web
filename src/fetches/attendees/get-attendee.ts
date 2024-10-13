import { AttendeeAndEventsType } from ".."
import { CreateRequest } from "../../classes/createRequest"
import { fetchApi } from "../fetchApi"

interface RequestProps {
  code: string
}

interface ResponseProps {
  successfully: boolean 
  message: string
  data?: {
    attendee: AttendeeAndEventsType
  }
}

export async function getAttendee({ code }: RequestProps): Promise<ResponseProps> {
  const { url, init } = new CreateRequest({
    method: 'GET',
    pathname: `/get/attendee/${code}`,
  })

  const { successfully, message, data } = await fetchApi({ url, init })

  if (successfully == true) {
    return {
      successfully,
      message: 'Participante buscado com sucesso.',
      data: {
        attendee: data.attendee,
      }
    }
  }

  if (message != undefined) {
    return {
      successfully: false,
      message: message,
      data: undefined,
    }
  }

  return {
    successfully: false,
    message: 'Erro ao buscar o participante',
    data: undefined,
  }
}