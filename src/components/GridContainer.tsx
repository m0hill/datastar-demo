import React from 'react'
import { ds } from '@/lib/datastar'

const GRID_DIMENSION = 1000
const CHUNK_SIZE = 16
const CELL_PIXEL_SIZE = 15
const CHUNK_PIXEL_SIZE = CHUNK_SIZE * CELL_PIXEL_SIZE
const TOTAL_PIXEL_SIZE = GRID_DIMENSION * CELL_PIXEL_SIZE

export const GridContainer: React.FC = () => {
  // This expression now correctly calculates the new chunk based on the window's scroll position
  const onScrollExpression = `
    $_newChunkX = Math.floor(window.scrollX / ${CHUNK_PIXEL_SIZE});
    $_newChunkY = Math.floor(window.scrollY / ${CHUNK_PIXEL_SIZE});
    $x = Math.floor(window.scrollX / ${CELL_PIXEL_SIZE});
    $y = Math.floor(window.scrollY / ${CELL_PIXEL_SIZE});
    if ($_newChunkX !== $chunkX || $_newChunkY !== $chunkY) {
      $chunkX = $_newChunkX;
      $chunkY = $_newChunkY;
      ${ds.actions.grid.updateViewport()};
    }
  `
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <div
      id="grid-resource"
      {...{
        'data-on-scroll__window__throttle.150ms': onScrollExpression,
      }}
      data-signals={`{
        chunkX: 0,
        chunkY: 0,
        x: 0,
        y: 0,
        _newChunkX: 0,
        _newChunkY: 0
      }`}
      className="flex flex-col items-center"
    >
      <div className="sticky top-0 z-10 w-full flex flex-col items-center bg-gray-100/80 py-2 backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-2">One Million Checkboxes</h1>
        <p className="text-gray-600 mb-4">A Datastar.js stress test. Scroll to load new chunks.</p>

        <div className="mb-2 text-sm text-gray-500 font-mono">
          Coordinates: (
          <span data-text="$x" className="inline-block w-8 text-center">
            0
          </span>
          ,
          <span data-text="$y" className="inline-block w-8 text-center">
            0
          </span>
          )
        </div>
      </div>

      <div
        data-ref="_view"
        // The overflow-auto is still useful for focus and accessibility
        className="w-full max-w-4xl h-[75vh] overflow-auto border-4 border-gray-300 bg-gray-50 shadow-lg"
      >
        <div
          style={{
            position: 'relative',
            width: `${TOTAL_PIXEL_SIZE}px`,
            height: `${TOTAL_PIXEL_SIZE}px`,
          }}
        >
          <div id="grid-board" className="absolute top-0 left-0"></div>
        </div>
      </div>
    </div>
  )
}

export default GridContainer
