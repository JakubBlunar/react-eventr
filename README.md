# React-eventr

Small library for notifying react components.
Sometimes you need to notify another components about some event that happens in actions. With this library you are able to notify also from redux.

## Setup

### Only react

```
// src/index.ts
import { EventrProvider } from 'react-eventr'

export const Index: React.FC = () => {
  return (
    <EventrProvider bufferSize={10}>
      <TestComponent />
    </EventrProvider>
  )
}

// test-component.tsx
const TestComponent: React.FC = () => {
  // const { addEvent } = useAddEvent()

  const { addEvent } = useEvent((event) => {
    alert(event.type, event.data)
  }, 'some-event')

  return (
    <button
      onClick={() =>
        addEvent({
          type: 'some-event',
          data: 'string';
        })
      }
    >
      Dispatch React Event
    </button>
  )
}
```

### With redux

```
import { createEventRReducer, addNewEvent } from 'react-eventr'

export const makeStore = () => {
  const rootReducer = combineReducers({
    eventr: createEventRReducer(10),
  })

  const store = createStore(rootReducer)

  return store
}

export const Example: React.FC = () => {
  const store = makeStore()

  return (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  )
}


const TestComponent: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={() =>
          dispatch(
            addNewEvent({
              type: 'redux-event',
            })
          )
        }
      >
        Dispatch redux Event
      </button>

      <Subscriber />
    </>
  )
}

const Subscriber: React.FC = () => {
  useReduxEvent((event) => {
    alert(event.type)
  }, 'redux-event')

  return null
}
```
