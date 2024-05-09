import { useUrl } from './contexts/url-provider'
import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'

export function App() {
  const { pathname, slug } = useUrl()

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
      <Header />

      {pathname === `/evento/${slug}/participantes` && <AttendeeList />}
      {pathname === '/eventos' && <EventList />}
    </div>
  )
}