import { HubEvent } from '../types'

export const getEvents = (state: any): HubEvent[] => state?.eventr?.hubEvents || []
