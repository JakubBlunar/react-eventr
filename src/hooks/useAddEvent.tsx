import { useContext } from 'react'
import { EventsContext } from '../context'

export function useAddEvent() {
  const context = useContext(EventsContext)
  console.log(context)

  return {
    addEvent: context.addEvent,
    addEvents: context.addEvents,
  }
}
