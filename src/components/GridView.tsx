import type { Chunk } from '@drizzle/schemas/grid.schema'
import React from 'react'
import { ds } from '@/lib/datastar'

interface GridViewProps {
  chunks: Chunk[]
  chunkSize: number
  chunksPerRow: number
}

const CELL_PIXEL_SIZE = 15

export const GridView: React.FC<GridViewProps> = ({ chunks, chunkSize, chunksPerRow }) => {
  return (
    <>
      {chunks.map(chunk => {
        const chunkX = chunk.id % chunksPerRow
        const chunkY = Math.floor(chunk.id / chunksPerRow)
        return (
          <div
            key={chunk.id}
            id={`chunk-${chunk.id}`}
            className="grid"
            style={{
              position: 'absolute',
              left: `${chunkX * chunkSize * CELL_PIXEL_SIZE}px`,
              top: `${chunkY * chunkSize * CELL_PIXEL_SIZE}px`,
              width: `${chunkSize * CELL_PIXEL_SIZE}px`,
              height: `${chunkSize * CELL_PIXEL_SIZE}px`,
              gridTemplateColumns: `repeat(${chunkSize}, 1fr)`,
            }}
          >
            {chunk.cells.map((cellState, cellIndex) => (
              <input
                key={cellIndex}
                type="checkbox"
                className="m-0 size-[15px] appearance-none border border-gray-400 checked:bg-blue-500 cursor-pointer"
                checked={cellState === 1}
                data-on-click={`$chunkId = ${chunk.id}; $cellIndex = ${cellIndex}; ${ds.actions.grid.check()}`}
                readOnly
              />
            ))}
          </div>
        )
      })}
    </>
  )
}
