export type HubEventBase<D = any> = {
  id?: string
  created?: Date
  type: string
  data?: D
}

export type HubEvent = HubEventBase

export type NotificationState = {
  hubEvents: HubEvent[]
}

export type EventsState = {
  hubEvents: HubEvent[]
}
