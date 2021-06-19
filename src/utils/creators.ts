import { createContext } from '../context'
import { createReactHooks, createReduxHooks } from '../hooks/useEvents'
import { createActions } from '../redux'
import { createAddEventHooks } from '../hooks/useAddEvent'

export type HubEventBase<T = string, D = any> = {
  id?: string
  created?: Date
  type: T
  data: D
}

export function createReduxModule<HubEventType = string, HubEvent = any>() {
  const { useReduxEvent, useReduxEvents } = createReduxHooks<HubEventType, HubEvent>()
  const { EventrActions, addEvent, addEvents } = createActions<HubEvent>()

  return {
    useReduxEvent,
    useReduxEvents,
    addEvents,
    addEvent,
    EventrActions,
  }
}

export function createReactModule<HubEventType = string, HubEvent = any>() {
  const { eventsContext } = createContext<HubEvent>()

  const { useAddEvent } = createAddEventHooks<HubEvent>(eventsContext)
  const { useEvents, useEvent } = createReactHooks<HubEventType, HubEvent>(eventsContext)

  return {
    useAddEvent,
    eventsContext,
    useEvent,
    useEvents,
  }
}
