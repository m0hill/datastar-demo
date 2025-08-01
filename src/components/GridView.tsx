import type { Chunk } from '@drizzle/schemas/grid.schema'
import React from 'react'
import { CELL_GAP_PX, CELL_SIZE_PX, PX_PER_CELL } from '@/constants/grid'
import { ds } from '@/lib/datastar'

interface GridViewProps {
  chunks: Chunk[]
  chunkSize: number
  chunksPerRow: number
}

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
              left: `${chunkX * chunkSize * PX_PER_CELL}px`,
              top: `${chunkY * chunkSize * PX_PER_CELL}px`,
              width: `${chunkSize * PX_PER_CELL}px`,
              height: `${chunkSize * PX_PER_CELL}px`,
              gridTemplateColumns: `repeat(${chunkSize}, ${CELL_SIZE_PX}px)`,
              gridTemplateRows: `repeat(${chunkSize}, ${CELL_SIZE_PX}px)`,
              gap: `${CELL_GAP_PX}px`,
            }}
          >
            {chunk.cells.map((cellState, cellIndex) => (
              <input
                key={cellIndex}
                type="checkbox"
                style={{
                  width: `${CELL_SIZE_PX}px`,
                  height: `${CELL_SIZE_PX}px`,
                }}
                className="m-0 appearance-none border border-gray-400 checked:bg-blue-500 cursor-pointer"
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
