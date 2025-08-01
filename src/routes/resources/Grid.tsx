import * as schema from '@drizzle/schemas/grid.schema'
import { chunks } from '@drizzle/schemas/grid.schema'
import migrations from '@migrations/grid/migrations'
import { count, eq, inArray } from 'drizzle-orm'
import { DrizzleSqliteDODatabase, drizzle as drizzleDO } from 'drizzle-orm/durable-sqlite'
import { migrate as migrateDO } from 'drizzle-orm/durable-sqlite/migrator'
import { renderToString } from 'react-dom/server'
import { GridView } from '@/components/GridView'
import { isDevelopment } from '@/constants/env'
import { BaseResource } from '@/routes/resources'

const GRID_DIMENSION = 1000
const CHUNK_SIZE = 16
const CHUNKS_PER_ROW = Math.ceil(GRID_DIMENSION / CHUNK_SIZE)
const TOTAL_CHUNKS = CHUNKS_PER_ROW * CHUNKS_PER_ROW

export class GridResource extends BaseResource {
  private db: DrizzleSqliteDODatabase<typeof schema>
  private viewport = { x: 0, y: 0 }

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    this.db = drizzleDO(this.ctx.storage, { schema, logger: isDevelopment })
    this.ctx.blockConcurrencyWhile(() => this.initialize())
  }

  private async initialize() {
    await migrateDO(this.db, migrations)
    const result = await this.db.select({ value: count() }).from(chunks)
    const numChunks = result[0]?.value ?? 0
    if (numChunks === 0) {
      const blankChunkCells = Array(CHUNK_SIZE * CHUNK_SIZE).fill(0)
      for (let i = 0; i < TOTAL_CHUNKS; i++) {
        await this.db.insert(chunks).values({ id: i, cells: blankChunkCells })
      }
    }
  }

  protected getUiSelector(): string {
    return '#grid-board'
  }

  protected async render(): Promise<string> {
    const { x, y } = this.viewport

    const renderBuffer = 4

    const startChunkX = Math.max(0, x - 1)
    const endChunkX = Math.min(CHUNKS_PER_ROW - 1, x + renderBuffer)
    const startChunkY = Math.max(0, y - 1)
    const endChunkY = Math.min(CHUNKS_PER_ROW - 1, y + renderBuffer)

    const requiredChunkIds: number[] = []
    for (let i = startChunkY; i <= endChunkY; i++) {
      for (let j = startChunkX; j <= endChunkX; j++) {
        requiredChunkIds.push(i * CHUNKS_PER_ROW + j)
      }
    }

    if (requiredChunkIds.length === 0) {
      return ''
    }

    const visibleChunks = await this.db
      .select()
      .from(chunks)
      .where(inArray(chunks.id, requiredChunkIds))

    const gridComponent = (
      <div id="grid-board" className="absolute top-0 left-0">
        <GridView chunks={visibleChunks} chunkSize={CHUNK_SIZE} chunksPerRow={CHUNKS_PER_ROW} />
      </div>
    )
    return renderToString(gridComponent)
  }

  async updateViewport(chunkX: number, chunkY: number) {
    if (this.viewport.x !== chunkX || this.viewport.y !== chunkY) {
      this.viewport = { x: chunkX, y: chunkY }
      await this.broadcastState()
    }
  }

  async toggleCell(chunkId: number, cellIndex: number) {
    const chunk = await this.db.query.chunks.findFirst({ where: (c, { eq }) => eq(c.id, chunkId) })
    if (!chunk) return

    const newCells = [...chunk.cells]
    newCells[cellIndex] = newCells[cellIndex] === 0 ? 1 : 0

    await this.db.update(chunks).set({ cells: newCells }).where(eq(chunks.id, chunkId))
    await this.broadcastState()
  }
}
