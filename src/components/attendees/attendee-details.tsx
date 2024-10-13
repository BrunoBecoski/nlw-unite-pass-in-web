import { useEffect, useState } from "react";
import { useRouter } from "../../contexts/router-provider";
import { AttendeeAndEventsType, getAttendee } from "../../fetches";

export function AttendeeDetails() {
  const [attendee, setAttendee] = useState<AttendeeAndEventsType>({} as AttendeeAndEventsType)

  const { code } = useRouter()

  useEffect(() => {
    async function fetch() {
      if (code != undefined) {

        const { successfully, message, data } = await getAttendee({ code })
        
        if (successfully == false) {
          alert(message)
        }
        
        if (successfully == true && data != undefined) {
          setAttendee(data.attendee)
        } 
      }
    }

    fetch()
  }, [])

  return (
    <div>
      <h1>Participante {attendee.name}</h1>
      <pre>
        {JSON.stringify(attendee, null, ' ')}
      </pre>
    </div>
  )
}