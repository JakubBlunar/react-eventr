import _, { Dictionary } from 'lodash'
import { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { EventsContext } from '../context'
import { getEvents } from '../redux/selectors'
import { HubEventBase } from '../types'

type Callback<T> = (event: HubEventBase<T>) => void

export function useReduxEvents(callback: Callback<HubEventBase<any>>, events?: string[]) {
  const hubEvents = useSelector(getEvents)
  const lastEventTime = useRef<Date | undefined>(_.head(hubEvents)?.created)

  useEffect(() => {
    for (let i = 0; i < hubEvents.length; i++) {
      const event = hubEvents[i]
      if (!event.created) continue
      if (lastEventTime.current && event.created <= lastEventTime.current) break
      if (!events || _.includes(events, event.type)) {
        callback(event)
      }
    }

    lastEventTime.current = _.head(hubEvents)?.created
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubEvents])
}

export function useReduxEvent<T extends Dictionary<unknown>>(callback: Callback<T>, event: string) {
  // @ts-ignore
  useReduxEvents(callback, [event])
}

export function useEvents(callback: Callback<HubEventBase<any>>, events?: string[]) {
  const context = useContext(EventsContext)
  const hubEvents = context.hubEvents || []
  const lastEventTime = useRef<Date | undefined>(_.head(hubEvents)?.created)

  useEffect(() => {
    for (let i = 0; i < hubEvents.length; i++) {
      const event = hubEvents[i]
      if (!event.created) continue
      if (lastEventTime.current && event.created <= lastEventTime.current) break
      if (!events || _.includes(events, event.type)) {
        callback(event)
      }
    }

    lastEventTime.current = _.head(hubEvents)?.created
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubEvents])

  return {
    addEvent: context.addEvent,
    addEvents: context.addEvents,
  }
}

export function useEvent<T extends Dictionary<unknown>>(callback: Callback<T>, event: string) {
  // @ts-ignore
  return useEvents(callback, [event])
}
