import { EventsState } from '../types'
import { EventRActions, ADD_NEW_EVENT, ADD_NEW_EVENTS } from './actions'
import _ from 'lodash'
import { Reducer } from 'redux'
import { createNewEvents } from '../utils/events'

const initialState: EventsState = {
  hubEvents: [],
}

const notificationReducer: (bufferSize: number) => Reducer<EventsState, EventRActions> = (
  bufferSize: number
) => (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_EVENT:
    case ADD_NEW_EVENTS: {
      return {
        ...state,
        hubEvents: createNewEvents(state.hubEvents, action.payload.events, bufferSize),
      }
    }
    default:
      return state
  }
}

export const createEventRReducer = (bufferSize = 20) => notificationReducer(bufferSize)
