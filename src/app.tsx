import { useRouter } from './contexts/router-provider'
import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'

export function App() {
  const { currentRoute } = useRouter()

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
      <Header />

      {currentRoute === 'events' && <EventList />}
      {currentRoute === 'eventSlugAttendee' && <AttendeeList />}
    </div>
  )
}