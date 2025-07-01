import type { FC } from 'react'
import type { Memo } from '../../db/schema'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

export const MemoItem: FC<{ memo: Memo }> = ({ memo }) => (
  <Card id={`memo-${memo.id}`} className="mb-3">
    <CardContent className="p-4">
      <p className="text-gray-800 break-words whitespace-pre-wrap flex-1">{memo.content}</p>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex justify-between items-center">
      <div className="text-xs text-gray-400">{new Date(memo.createdAt).toLocaleString()}</div>
      <Button variant="destructive" size="sm" data-on-click={`@post('/memos/delete/${memo.id}')`}>
        Delete
      </Button>
    </CardFooter>
  </Card>
)
