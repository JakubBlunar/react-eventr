import _ from 'lodash'
import { getEvents } from '../selectors'
import { HubEvent } from '../..'

describe('notification selector tests', () => {
  const events: HubEvent[] = _.times(2, (x) => ({
    type: 'SOME_EVENT',
    data: { orderId: `${x}` },
    id: `${x}`,
    created: new Date(1994, 24, 5, 7, x),
  }))

  const state = {
    eventr: {
      hubEvents: events,
    },
  }

  it('tests getHubEvents selector', () => {
    expect(getEvents(state)).toEqual(events)
  })
})
