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

interface ViewportPayload {
  chunkX: number
  chunkY: number
}

export class GridResource extends BaseResource {
  private db: DrizzleSqliteDODatabase<typeof schema>

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
    return this.renderViewport(0, 0)
  }

  private async renderViewport(x: number, y: number): Promise<string> {
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
      return `<div id="grid-board" class="absolute top-0 left-0"></div>`
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

  async handleViewportUpdate(request: Request): Promise<Response> {
    const { chunkX, chunkY } = await request.json<ViewportPayload>()
    const html = await this.renderViewport(chunkX, chunkY)
    const headers = new Headers({
      'Content-Type': 'text/html',
      'datastar-selector': '#grid-board',
      'datastar-mode': 'outer',
      'Access-Control-Allow-Origin': '*',
    })
    return new Response(html, { headers })
  }

  async toggleCell(chunkId: number, cellIndex: number) {
    const chunk = await this.db.query.chunks.findFirst({ where: (c, { eq }) => eq(c.id, chunkId) })
    if (!chunk) return

    const newCells = [...chunk.cells]
    newCells[cellIndex] = newCells[cellIndex] === 0 ? 1 : 0

    await this.db.update(chunks).set({ cells: newCells }).where(eq(chunks.id, chunkId))

    const updatedChunk = { ...chunk, cells: newCells }
    const chunkHtml = renderToString(
      <GridView chunks={[updatedChunk]} chunkSize={CHUNK_SIZE} chunksPerRow={CHUNKS_PER_ROW} />
    )

    this.broadcastPatch({
      elements: chunkHtml,
      selector: `#chunk-${chunkId}`,
      mode: 'outer',
    })
  }

  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if (request.method === 'POST' && url.pathname.endsWith('/viewport')) {
      return this.handleViewportUpdate(request)
    }
    return super.fetch(request)
  }
}
