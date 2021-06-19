export type HubEventBase<T = string, D = any> = {
  id: string
  created?: Date
  type: T
  data: D
}

export interface HubEvent {}

export enum HubEventType {}

export type NotificationState = {
  hubEvents: HubEvent[]
}

export type EventsState = {
  hubEvents: HubEvent[]
}
