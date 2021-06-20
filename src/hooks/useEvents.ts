import _ from 'lodash'
import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getEvents } from '../redux/selectors'

type Callback<T, HubEvent> = (event: Extract<HubEvent, { type: T }>) => void

export function createReduxHooks<HubEventType, HubEvent>() {
  function useReduxEvents(callback: Callback<HubEventType, HubEvent>, events?: HubEventType[]) {
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

  function useReduxEvent<T extends string>(callback: Callback<T, HubEvent>, event: T) {
    // @ts-ignore
    useReduxEvents(callback, [event])
  }

  return {
    useReduxEvents,
    useReduxEvent
  }
}

export function createReactHooks<HubEventType = string, HubEvent = any>(
  reactContext: React.Context<any>
) {
  function useEvents(callback: Callback<any, HubEvent>, events?: HubEventType[]) {
    const context = useContext(reactContext)
    const hubEvents: any[] = context?.hubEvents || []
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

  function useEvent<T extends string>(callback: Callback<T, HubEvent>, event: T) {
    // @ts-ignore
    return useEvents(callback, [event])
  }

  return {
    useEvent,
    useEvents
  }
}
