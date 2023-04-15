# React-eventr

![ts-badge](https://img.shields.io/badge/typescript-friendly-brightgreen) ![npm version](https://badge.fury.io/js/react-eventr.svg) ![check-code-coverage](https://img.shields.io/badge/code--coverage-86.44%25-green) ![typescript](https://img.shields.io/github/languages/top/JakubBlunar/react-eventr)

Small library for notifying react components.
Sometimes you need to notify another components about some event that happens in application. With this library you are able to notify components also from redux.

Library provides clear api with possibility to strongly typed events.
For more information look at example.

## Setup

For typescript first you need to define your event types. These types will come as parameters into creation of eventr module.

```
enum HubEventType {
  OrderPaid = 'OrderPaid',
  ConsentAccepted = 'ConsentAccepted'
}

type HubEvent =
  | HubEventBase<HubEventType.OrderPaid, { orderId: string }>
  | HubEventBase<
      HubEventType.ConsentAccepted,
      {
        productCode: string
      }
    >
```

### Only react

Import createReactModule into some new file. You will export and import everything you will need from this file.
For react you will need to use EventrProvider that will store your dispatched events.

```
// src/index.ts
import { EventrProvider, createReactModule } from 'react-eventr'

const { useAddEvent, useEvent, eventsContext, useEvents } = createReactModule<
  HubEventType,
  HubEvent
>()

export const Index: React.FC = () => {
  return (
    <EventrProvider bufferSize={10} Provider={eventsContext.Provider}>
      <TestComponent />
    </EventrProvider>
  )
}

// test-component.tsx
const TestComponent: React.FC = () => {
  const { addEvent } = useAddEvent()

  useEvent((event) => {
    // do something with event
  }, HubEventType.OrderPaid)

  useEvents((event) => {
     switch (event.type) {
        case HubEventType.ConsentAccepted: {
          // do something when event comes, events are strongly typed
        }
      }
  }, [HubEventType.ConsentAccepted])

  return (
    <button
      onClick={() =>
        addEvent({
          type: HubEventType.OrderPaid,
          data: {
              orderId: 'OrderId1'
          }
        })
      }
    >
      Dispatch React Event
    </button>
  )
}
```

### With redux

Import createReduxModule into some new file. You will export and import everything you will need from this file.
For redux you will also need to inject eventr reducer into your reducers.

```
import { createEventRReducer, createReduxModule } from 'react-eventr'

const rootReducer = combineReducers({
  eventr: createEventRReducer()
})

const { useReduxEvent, EventrActions, useReduxEvents, addEvent } = createReduxModule<HubEventType, HubEvent>()

const TestComponent: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={() =>
          dispatch(
            addNewEvent({
              type: HubEventType.ConsentAccepted,
              data: {
                productCode: '123456'
              }
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
    // do something when event comes, events are strongly typed
  }, HubEventType.ConsentAccepted)

  useReduxEvents(
    (event) => {
      switch (event.type) {
        case HubEventType.ConsentAccepted: {
          // do something when event comes, events are strongly typed
        }
      }
    },
    [HubEventType.OrderPaid, HubEventType.ConsentAccepted]
  )

  return null
}
```
