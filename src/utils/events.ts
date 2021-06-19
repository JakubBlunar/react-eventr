import _ from 'lodash'
import { HubEvent } from '../types'

export const createNewEvents = (oldEvents: HubEvent[], newEvents: HubEvent[], bufferSize: number) =>
  _.take(
    _.orderBy(
      _.concat(
        oldEvents,
        _.map(newEvents, (x) => (x.created ? x : { ...x, created: new Date() }))
      ),
      [(x) => x.created],
      ['desc']
    ),
    bufferSize
  )
