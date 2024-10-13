import { useRouter } from './contexts/router-provider'
import { Header } from './components/header'

import { EventList } from './components/events/event-list'
import { EventForm } from './components/events/event-form'
import { EventDetails } from './components/events/event-details'

import { AttendeeList } from './components/attendees/attendee-list'
import { AttendeeForm } from './components/attendees/attendee-form'
import { AttendeeDetails } from './components/attendees/attendee-details'

export function App() {
  const { pathname, slug, code } = useRouter()

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
      <Header />
      
      {pathname === '/eventos' && <EventList />}
      {pathname === '/participantes' && <AttendeeList />}

      {pathname === '/criar/participante' && <AttendeeForm />}
      {pathname === '/criar/evento' && <EventForm />}

      {pathname === `/evento/${slug}` && <EventDetails />}
      {pathname === `/participante/${code}` && <AttendeeDetails />}
    </div>
  )
}