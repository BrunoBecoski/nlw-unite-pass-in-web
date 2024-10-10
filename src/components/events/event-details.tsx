import { useEffect, useState } from "react"

import { useRouter } from "../../contexts/router-provider"
import { getEvent } from "../../fetches/events/get-event"
import { EventTypes } from "../../fetches"

export function EventDetails() {
  const [event, setEvent] = useState<EventTypes>({} as EventTypes )

  const { slug } = useRouter()

  useEffect(() => {
    async function fetch() {
      if (slug != undefined) {

        const { successfully, message, data } = await getEvent({ slug })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setEvent(data.event)
        } 
      }
    }

    fetch()
  }, [])

  return (
    <h1>Detalhes do evento {event.title}</h1>
  )
}