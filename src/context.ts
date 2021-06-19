import _ from 'lodash'
import React from 'react'
import { HubEvent } from '.'

type EventsContextValue = {
  hubEvents: HubEvent[]
  addEvent: (event: HubEvent) => void
  addEvents: (events: HubEvent[]) => void
}

export const EventsContext = React.createContext<EventsContextValue>({
  hubEvents: [],
  addEvent: _.noop,
  addEvents: _.noop,
})
