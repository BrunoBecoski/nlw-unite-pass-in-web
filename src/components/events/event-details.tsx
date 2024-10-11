import { useEffect, useState } from "react"
import dayjs from "dayjs"

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
    <div>
      <h1>{event.title}</h1>
      <h2>{event.details}</h2>

      <div>
        De <p>{dayjs(event.startDate).format("DD [de] MMMM [de] YYYY")}</p>
        até <p>{dayjs(event.endDate).format("DD [de] MMMM [de] YYYY")}</p>
      </div>

    </div>
  )
}