import { createEvent } from './events/create-event'
import { deleteEvent } from './events/delete-event'
import { getEvent } from './events/get-event'
import { getEvents } from './events/get-events'
import { getEventAttendees } from './events/get-event-attendees'
import { updateEvent } from './events/update-event'

import { createAttendee } from './attendees/create-attendee'
import { deleteAttendee } from './attendees/delete-attendee'
import { getAttendee } from './attendees/get-attendee'
import { getAttendees } from './attendees/get-attendees'
import { getAttendeeEvents } from './attendees/get-attendee-events'
import { updateAttendeeCode } from './attendees/update-attendee-code'
import { updateAttendee } from './attendees/update-attendee'

import { checkInEventAttendee } from './eventAttendee/checkIn-eventAttendee'
import { createEventAttendee } from './eventAttendee/create-eventAttendee'
import { deleteEventAttendee } from './eventAttendee/delete-eventAttendee'

export type AttendeeTypes = {
  id: string,
  code: string,
  name: string,
  email: string,
}

export type AttendeesTypes = {
  id: string
  code: string
  name: string
  email: string
  events: number
}[]

export type AttendeeEventsTypes = {
  id: string
  slug: string
  title: string
  startDate: string
  endDate: string
  checkIn: string 
}[]

export type EventTypes = {
  id: string
  slug: string
  title: string
  details: string
  maximumAttendees: number
  startDate: string,
  endDate: string,
}

export type EventsType = {
  id: string
  slug: string
  title: string
  details: string
  maximumAttendees: number
  startDate: string
  endDate: string
}[]

export type EventAttendeesType = {
  id: string
  code: string
  name: string
  email: string
  checkIn: boolean
}[]

export {
  createEvent,
  deleteEvent,
  getEvents,
  getEvent,
  getEventAttendees,
  updateEvent,
  createAttendee,
  deleteAttendee,
  getAttendee,
  getAttendees,
  getAttendeeEvents,
  updateAttendeeCode,
  updateAttendee,
  checkInEventAttendee,
  createEventAttendee,
  deleteEventAttendee,
}