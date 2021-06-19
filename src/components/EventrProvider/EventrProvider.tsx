import React, { useState } from 'react'
import { EventsContext } from '../../context'
import { HubEvent } from '../../types'
import { createNewEvents } from '../../utils/events'

type Props = {
  bufferSize?: number
}

export const EventrProvider: React.FC<Props> = ({ children, bufferSize }) => {
  const [events, setEvents] = useState<HubEvent[]>([])

  return (
    <EventsContext.Provider
      value={{
        hubEvents: events,
        addEvent: (event: HubEvent) => {
          setEvents(createNewEvents(events, [event], bufferSize || 20))
        },
        addEvents: (newEvents: HubEvent[]) => {
          setEvents(createNewEvents(events, newEvents, bufferSize || 20))
        },
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
