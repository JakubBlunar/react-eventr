export { EventrProvider } from './components/EventrProvider'
export * from './redux'
export * from './hooks/useAddEvent'
export * from './hooks/useEvents'

export type HubEvent = any

export enum HubEventType {
  TEST_REDUX = 'Test_redux',
  TEST_REACT = 'Test_react',
}
