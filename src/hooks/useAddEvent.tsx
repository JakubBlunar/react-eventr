import { useContext } from 'react'
import { EventsContext } from '../context'

export function useAddEvent() {
  const context = useContext(EventsContext)

  return {
    addEvent: context.addEvent,
    addEvents: context.addEvents,
  }
}
