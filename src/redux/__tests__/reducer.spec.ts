import _ from 'lodash'
import { createEventRReducer } from '../reducer'
import { createReduxModule } from '../..'

describe('notifications reducer spec', () => {
  const { EventrActions } = createReduxModule()

  const reducer = createEventRReducer(10)
  const initState = {
    hubEvents: [],
  }

  it('should correctly handle addNewEvents', () => {
    const events = _.times(2, (x) => ({
      type: 'EventDispatched',
      data: { orderId: `${x}` },
      id: `${x}`,
      created: x == 0 ? new Date() : undefined,
    }))

    const state = reducer(initState, EventrActions.addEvents(events))

    expect(state.hubEvents).toHaveLength(2)

    state.hubEvents.forEach((x) => {
      expect(x.created).toBeDefined()
    })
  })

  it('should correctly handle addNewEvent', () => {
    const event = {
      type: 'EventDispatched',
      data: { orderId: '1' },
      id: '1',
      created: undefined,
    }

    const state = reducer(initState, EventrActions.addEvent(event))

    expect(state.hubEvents).toHaveLength(1)

    state.hubEvents.forEach((x) => {
      expect(x.created).toBeDefined()
    })
  })

  it('should correctly handle not registered action', () => {
    // @ts-ignore
    expect(reducer(initState, { type: 'ANOTHER-type' })).toEqual(initState)
  })
})
