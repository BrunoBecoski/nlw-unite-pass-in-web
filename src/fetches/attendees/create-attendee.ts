import { CreateRequest } from '../../classes/createRequest'
import { FetchApi } from '../fetchApi'

interface CreateAttendeeProps {
  name: string
  email: string
}

export async function createAttendee({ name, email }: CreateAttendeeProps) {
  const { url, init } = new CreateRequest({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    pathname: '/create/attendee',
    body: JSON.stringify({
      name,
      email,
    })
  })
  
  const response = await FetchApi({ url, init })

  console.log(response)
}