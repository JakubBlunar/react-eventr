import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import {
  createReactModule,
  createReduxModule,
  EventrProvider,
  createEventRReducer,
  HubEventBase
} from '../../src'

const makeStore = () => {
  const rootReducer = combineReducers({
    eventr: createEventRReducer()
  })

  const store = createStore(rootReducer)

  return store
}

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

const { useReduxEvent, EventrActions, useReduxEvents } = createReduxModule<HubEventType, HubEvent>()

const { useAddEvent, useEvent, eventsContext, useEvents } = createReactModule<
  HubEventType,
  HubEvent
>()

const Subscriber: React.FC = () => {
  const { addEvent } = useAddEvent()
  useReduxEvent((event) => {
    alert(`Consent for product ${event.data.productCode} accepted`)
  }, HubEventType.ConsentAccepted)

  useReduxEvents(
    (event) => {
      switch (event.type) {
        case HubEventType.ConsentAccepted: {
          console.log(`Consent for product ${event.data.productCode} accepted`)
        }
      }
    },
    [HubEventType.OrderPaid, HubEventType.ConsentAccepted]
  )

  useEvent((event) => {
    alert(`Order ${event.data.orderId} paid`)
  }, HubEventType.OrderPaid)

  useEvents(
    (event) => {
      switch (event.type) {
        case HubEventType.OrderPaid: {
          console.log(`Order ${event.data.orderId} paid`)
        }
      }
    },
    [HubEventType.OrderPaid]
  )

  return (
    <button
      onClick={() => {
        addEvent({
          type: HubEventType.OrderPaid,
          data: {
            orderId: 'OrderId2'
          }
        })
      }}
    >
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
            EventrActions.addEvent({
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

      <button
        onClick={() => {
          addEvent({
            type: HubEventType.OrderPaid,
            data: {
              orderId: 'OrderId1'
            }
          })
        }}
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
      <EventrProvider bufferSize={10} Provider={eventsContext.Provider}>
        <TestComponent />
      </EventrProvider>
    </Provider>
  )
}
