import { EventEmitter } from 'node:events'

export const refreshBus = new EventEmitter()
refreshBus.setMaxListeners(0)

export const NOTIFY_CHANGE_EVENT = 'db:changed'

export function notifyChanges() {
  refreshBus.emit(NOTIFY_CHANGE_EVENT)
}
