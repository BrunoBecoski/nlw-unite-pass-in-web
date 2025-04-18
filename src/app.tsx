import { useRouter } from './contexts/router-provider'
import { Header } from './components/header'

import { EventList } from './components/events/event-list'
import { EventDetails } from './components/events/event-details'

import { AttendeeList } from './components/attendees/attendee-list'
import { AttendeeDetails } from './components/attendees/attendee-details'

export function App() {
  const { pathname, slug, code } = useRouter()

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-5">
      <Header />
      
      {pathname === '/eventos' && <EventList />}
      {pathname === '/participantes' && <AttendeeList />}

      {pathname === `/evento/${slug}` && <EventDetails />}
      {pathname === `/participante/${code}` && <AttendeeDetails />}
    </div>
  )
}