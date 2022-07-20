import { take, orderBy, concat, map } from 'lodash'

export const createNewEvents = (oldEvents: any[], newEvents: any[], bufferSize: number) =>
  take(
    orderBy(
      concat(
        oldEvents,
        map(newEvents, (x) => (x.created ? x : { ...x, created: new Date() }))
      ),
      [(x) => x.created],
      ['desc']
    ),
    bufferSize
  )
