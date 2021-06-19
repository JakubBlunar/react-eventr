import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import { createEventRReducer } from '../../redux'
import { EventsActions } from '../../redux/actions'
import { useEvent, useReduxEvent } from '../../hooks/useEvents'
import { EventrProvider } from '../EventrProvider'
import { useAddEvent } from '../../hooks/useAddEvent'
import { HubEventType } from '../..'

export const makeStore = () => {
  const rootReducer = combineReducers({
    eventr: createEventRReducer(10),
  })

  const store = createStore(rootReducer)

  return store
}

const Subscriber: React.FC = () => {
  useReduxEvent((event) => {
    alert(event.type)
  }, HubEventType.TEST_REACT)

  const { addEvent } = useEvent((event) => {
    alert(event.type)
  }, HubEventType.TEST_REACT)

  return (
    <button onClick={() => addEvent({ type: HubEventType.TEST_REACT })}>
      Add event from subscriber
    </button>
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
              type: HubEventType.TEST_REDUX,
            })
          )
        }
      >
        Dispatch redux Event
      </button>

      <button
        onClick={() =>
          addEvent({
            type: HubEventType.TEST_REACT,
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
