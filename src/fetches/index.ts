import { FetchEvents } from './fetchEvents'
import { FetchAttendees } from './fetchAttendees'

export type EventTypes = {
  id: string
  slug: string
  title: string
  details: string
  attendees: number
  maximumAttendees: number
  startDate: string,
  endDate: string,
  virtualEvent: boolean,
  physicalEvent: boolean,
  checkInAfterStart: boolean
}

export type AttendeeTypes = {
  id: string
  code: string
  name: string
  email: string
  events: number
}

export {
  FetchEvents,
  FetchAttendees,
}