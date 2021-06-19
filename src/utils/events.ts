import _ from 'lodash'

export const createNewEvents = (oldEvents: any[], newEvents: any[], bufferSize: number) =>
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
