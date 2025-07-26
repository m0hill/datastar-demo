import { DrizzleSqliteDODatabase, drizzle as drizzleDO } from 'drizzle-orm/durable-sqlite'
import { migrate as migrateDO } from 'drizzle-orm/durable-sqlite/migrator'
import { renderToString } from 'react-dom/server'
import { ChatRoom } from '@/components/ChatRoom'
import * as schema from '@/db/schema'
import { messages } from '@/db/schema'
import migrations from '../../../migrations/migrations.js'
import { BaseResource } from '../base'

export class ChatResource extends BaseResource {
  private db: DrizzleSqliteDODatabase<typeof schema>

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    this.db = drizzleDO(this.ctx.storage, { schema, logger: true })
    this.ctx.blockConcurrencyWhile(() => migrateDO(this.db, migrations))
  }

  protected getUiSelector(): string {
    return '#chat-resource'
  }

  protected async render(): Promise<string> {
    const allMessages = await this.db.select().from(messages).orderBy(messages.createdAt).limit(100)
    return renderToString(<ChatRoom messages={allMessages} />)
  }

  async addMessage(username: string, content: string) {
    if (!username || !content) {
      throw new Error('Username and content are required')
    }
    await this.db.insert(messages).values({
      id: crypto.randomUUID(),
      username,
      content,
      createdAt: new Date(),
    })
    await this.broadcastState()
  }
}
