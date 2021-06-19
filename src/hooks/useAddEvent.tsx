import React, { useContext } from 'react'
import { EventsContextValue } from '../context'

export function createAddEventHooks<HubEvent>(
  reactContext: React.Context<EventsContextValue<HubEvent>>
) {
  function useAddEvent() {
    const context = useContext(reactContext)

    return {
      addEvent: context.addEvent,
      addEvents: context.addEvents,
    }
  }

  return {
    useAddEvent,
  }
}
