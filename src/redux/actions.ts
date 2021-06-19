import { HubEvent } from '..'
import { createAction } from '../utils/redux'
import { ActionsUnion } from '../utils/types'

export const ADD_NEW_EVENTS = 'EVENTR/add-new-events'
export const ADD_NEW_EVENT = 'EVENTR/add-new-event'

export const addNewEvent = (event: HubEvent) => createAction(ADD_NEW_EVENT, { events: [event] })

export const addNewEvents = (events: HubEvent[]) => createAction(ADD_NEW_EVENTS, { events })

export const EventsActions = {
  addNewEvent,
  addNewEvents,
}

export type EventsActions = ActionsUnion<typeof EventsActions>
