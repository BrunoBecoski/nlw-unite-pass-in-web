import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'
import { useUrl } from './contexts/url-provider'

export function App() {
  const { pathname } = useUrl()


  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
    
      <Header />
      {pathname === '/participantes' && <AttendeeList />}
      {pathname === '/eventos' && <EventList />}
    </div>
  )
}  