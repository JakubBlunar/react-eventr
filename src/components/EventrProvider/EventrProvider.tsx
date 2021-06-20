import React, { useState } from 'react'
import { createNewEvents } from '../../utils/events'

type Props = {
  bufferSize?: number
  Provider: React.ComponentType<any>
  children: React.ReactNode | React.ReactNode[]
}

export function EventrProvider<T = any>({ children, Provider, bufferSize }: Props) {
  const [events, setEvents] = useState<any[]>([])

  return (
    <Provider
      value={{
        hubEvents: events,
        addEvent: (event: T) => {
          setEvents(createNewEvents(events, [event], bufferSize || 20))
        },
        addEvents: (newEvents: T) => {
          setEvents(createNewEvents(events, newEvents as any, bufferSize || 20))
        }
      }}
    >
      {children}
    </Provider>
  )
}
