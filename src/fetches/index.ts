import { getEvents } from './events/get-events'
import { getEvent } from './events/get-event'

import { getAttendees } from './attendees/get-attendees'
import { getAttendee } from './attendees/get-attendee'
import { createAttendee } from './attendees/create-attendee'


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

export type EventAndAttendeesType = {
  id: string
  slug: string
  title: string
  details: string
  maximumAttendees: number
  totalAttendees: number
  checkInAttendees: number
  startDate: string
  endDate: string
  total: number
  attendees: {
    id: string
    code: string
    name: string
    email: string
    checkIn: boolean
  }[]
}

export type AttendeeAndEventsType = {
  id: string
  code: string
  name: string
  email: string
  total: number
  events: {
    id: string
    slug: string
    title: string
    details: string
    startDate: string 
    endDate: string
    checkIn: boolean
  }[]
}

export {
  getEvent,
  getEvents,
  getAttendee,
  getAttendees,
  createAttendee,
}