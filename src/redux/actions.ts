import { createAction } from '../utils/redux'

export const ADD_NEW_EVENTS = 'EVENTR/add-new-events'
export const ADD_NEW_EVENT = 'EVENTR/add-new-event'

export function createActions<HubEvent>() {
  const addEvent = (event: HubEvent) => createAction(ADD_NEW_EVENT, { events: [event] })

  const addEvents = (events: HubEvent[]) => createAction(ADD_NEW_EVENTS, { events })

  return {
    addEvent,
    addEvents,
    EventrActions: {
      addEvent,
      addEvents
    }
  }
}
