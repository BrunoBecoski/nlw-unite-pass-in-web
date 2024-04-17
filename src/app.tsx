import { useState } from 'react'

import { Header } from './components/header'
import { AttendeeList } from './components/attendee-list'
import { EventList } from './components/event-list'

export function App() {
  const [page, setPage] = useState('events')

  return (
    <div className="max-w-[1216px] mx-auto flex flex-col gap-5">
      <Header setPage={setPage} />
      {page === 'attendees' &&   <AttendeeList />}
      {page === 'events' && <EventList />}
    </div>
  )
}  