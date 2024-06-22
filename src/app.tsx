import { useRouter } from './contexts/router-provider'
import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'
import { AttendeeForm } from './components/attendee-form'

export function App() {
  const { pathname } = useRouter()

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">      
      <Header />
      
      {pathname === '/eventos' && <EventList />}
      {pathname === '/participantes' && <AttendeeList />}

      {pathname === '/criar/participante' && <AttendeeForm />}
    </div>
  )
}