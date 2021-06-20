import _ from 'lodash'
import { getEvents } from '../selectors'

describe('notification selector tests', () => {
  const events: any[] = _.times(2, (x) => ({
    type: 'SOME_EVENT',
    data: { orderId: `${x}` },
    id: `${x}`,
    created: new Date(1994, 24, 5, 7, x)
  }))

  const state = {
    eventr: {
      hubEvents: events
    }
  }

  it('tests getHubEvents selector', () => {
    expect(getEvents(state)).toEqual(events)
  })

  it('tests getHubEvents selector on empty state', () => {
    expect(getEvents({})).toEqual([])
    expect(getEvents(undefined)).toEqual([])
    expect(getEvents({ eventr: undefined })).toEqual([])
    expect(getEvents({ eventr: { hubEvents: undefined } })).toEqual([])
  })
})
