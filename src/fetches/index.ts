import { createEvent } from './events/create-event'
import { deleteEvent } from './events/delete-event'
import { getEvents } from './events/get-events'
import { getEvent } from './events/get-event'
import { updateEvent } from './events/update-event'

import { createAttendee } from './attendees/create-attendee'
import { deleteAttendee } from './attendees/delete-attendee'
import { getAttendee } from './attendees/get-attendee'
import { getAttendees } from './attendees/get-attendees'
import { updateAttendeeCode } from './attendees/update-attendee-code'
import { updateAttendee } from './attendees/update-attendee'

import { checkInEventAttendee } from './eventAttendee/checkIn-eventAttendee'
import { createEventAttendee } from './eventAttendee/create-eventAttendee'
import { deleteEventAttendee } from './eventAttendee/delete-eventAttendee'

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
  createEvent,
  deleteEvent,
  getEvents,
  getEvent,
  updateEvent,
  createAttendee,
  deleteAttendee,
  getAttendee,
  getAttendees,
  updateAttendeeCode,
  updateAttendee,
  checkInEventAttendee,
  createEventAttendee,
  deleteEventAttendee,
}