export type HubEventBase<T = string, D = any> = {
  id: string
  created?: Date
  type: T
  data: D
}

export type HubEvent = any

export type HubEventType = string

export type NotificationState = {
  hubEvents: HubEvent[]
}

export type EventsState = {
  hubEvents: HubEvent[]
}
