import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import { createEventRReducer } from '../../redux'
import { EventsActions } from '../../redux/actions'
import { useEvent, useReduxEvent } from '../../hooks/useEvents'
import { EventrProvider } from '../EventrProvider'
import { useAddEvent } from '../../hooks/useAddEvent'

export const makeStore = () => {
  const rootReducer = combineReducers({
    eventr: createEventRReducer(10),
  })

  const store = createStore(rootReducer)

  return store
}

const REDUX_EVENT_TYPE = 'redux-event'
const REACT_EVENT_TYPE = 'react-event'

const Subscriber: React.FC = () => {
  useReduxEvent((event) => {
    alert(event.type)
  }, REDUX_EVENT_TYPE)

  const { addEvent } = useEvent((event) => {
    alert(event.type)
  }, REACT_EVENT_TYPE)

  return (
    <button onClick={() => addEvent({ type: REACT_EVENT_TYPE })}>Add event from subscriber</button>
  )
}

const TestComponent: React.FC = () => {
  const { addEvent } = useAddEvent()
  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={() =>
          dispatch(
            EventsActions.addNewEvent({
              type: REDUX_EVENT_TYPE,
            })
          )
        }
      >
        Dispatch redux Event
      </button>

      <button
        onClick={() =>
          addEvent({
            type: REACT_EVENT_TYPE,
          })
        }
      >
        Dispatch React Event
      </button>
      <Subscriber />
    </>
  )
}

export const Example: React.FC = () => {
  const store = makeStore()

  return (
    <Provider store={store}>
      <EventrProvider bufferSize={10}>
        <TestComponent />
      </EventrProvider>
    </Provider>
  )
}
