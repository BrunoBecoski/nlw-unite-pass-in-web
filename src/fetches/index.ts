import { createAttendee } from './attendees/create-attendee'
import { getAttendee } from './attendees/get-attendees'

import { getEvents } from './events/get-events'

export type AttendeeTypes = {
  id: string
  code: string
  name: string
  email: string
  events: number
}
  
export type EventTypes = {
  id: string
  slug: string
  title: string
  details: string
  attendees: number
  maximumAttendees: number
  startDate: string,
  endDate: string,
}

export {
  getEvents,
  createAttendee,
  getAttendee,
}