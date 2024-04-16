import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'

export function App() {
  const url = new URL(window.location.href)

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
      <Header />
      {url.pathname === '/participantes' && <AttendeeList />}
      {url.pathname === '/eventos' && <EventList />}
    </div>
  )
}  