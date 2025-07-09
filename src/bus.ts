import { EventEmitter } from 'node:events'
import type { Conversation, Message } from './db/schema'

export const refreshBus = new EventEmitter()
refreshBus.setMaxListeners(0)

export const NOTIFY_CHANGE_EVENT = 'db:changed'

export type ChangePayload =
  | { type: 'message.created'; data: Message }
  | { type: 'message.deleted'; data: { id: string } }
  | { type: 'message.updated'; data: Message }
  | { type: 'conversation.created'; data: Conversation }
  | { type: 'conversation.updated'; data: Conversation }

export function notifyChanges(payload: ChangePayload) {
  refreshBus.emit(NOTIFY_CHANGE_EVENT, payload)
}
