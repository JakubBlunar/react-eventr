import { HubEvent } from '..'

export const getEvents = (state: any): HubEvent[] => state?.eventr?.hubEvents || []
