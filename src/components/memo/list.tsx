import type { FC } from 'react'
import type { Memo } from '../../db/schema'
import { MemoItem } from './item'

export const MemoList: FC<{ memos: Memo[] }> = ({ memos }) => (
  <div id="memo-list">
    {memos.length > 0 ? (
      memos.map(memo => <MemoItem key={memo.id} memo={memo} />)
    ) : (
      <p className="text-center text-gray-500 py-4">No memos yet. Add one above!</p>
    )}
  </div>
)
