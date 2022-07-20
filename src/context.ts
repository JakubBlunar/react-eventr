import { noop } from 'lodash'
import React from 'react'

export type EventsContextValue<HubEvent> = {
  hubEvents: HubEvent[]
  addEvent: (event: HubEvent) => void
  addEvents: (events: HubEvent[]) => void
}

export function createContext<HubEvent = any>() {
  const eventsContext = React.createContext<EventsContextValue<HubEvent>>({
    hubEvents: [],
    addEvent: noop,
    addEvents: noop
  })
  return {
    eventsContext
  }
}
