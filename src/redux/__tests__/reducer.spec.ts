import _ from 'lodash'
import { EventsActions } from '../actions'
import { createEventRReducer } from '../reducer'
import { HubEvent, NotificationState } from '../../types'

describe('notifications reducer spec', () => {
  const reducer = createEventRReducer(10)
  const initState: NotificationState = {
    hubEvents: [],
  }

  it('should correctly handle addNewEvents', () => {
    const events: HubEvent[] = _.times(2, (x) => ({
      type: 'EventDispatched',
      data: { orderId: `${x}` },
      id: `${x}`,
      created: x == 0 ? new Date() : undefined,
    }))

    const state = reducer(initState, EventsActions.addNewEvents(events))

    expect(state.hubEvents).toHaveLength(2)

    state.hubEvents.forEach((x) => {
      expect(x.created).toBeDefined()
    })
  })

  it('should correctly handle not registered action', () => {
    // @ts-ignore
    expect(reducer(initState, { type: 'ANOTHER-type' })).toEqual(initState)
  })
})
