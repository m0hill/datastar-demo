import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { type ChangePayload, notifyChanges } from '../bus'
import * as schema from './schema'

const client = createClient({
  url: 'file:local.db',
})

const drizzleDb = drizzle(client, {
  logger: true,
  schema,
})

type TransactionCallback = Parameters<typeof drizzleDb.transaction>[0]
type TransactionType = Parameters<TransactionCallback>[0]
type WriteTransactionCallback<T> = (tx: TransactionType) => Promise<T>

async function writeTransaction<T>(
  callback: WriteTransactionCallback<T>,
  payload: ChangePayload
): Promise<T> {
  const result = await drizzleDb.transaction(async tx => {
    return await callback(tx)
  })

  notifyChanges(payload)
  return result
}

export const db = Object.assign(drizzleDb, { writeTransaction })
export type Db = typeof db
