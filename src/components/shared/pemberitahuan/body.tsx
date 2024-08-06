'use client'

import {
  DataItemType,
  loadMoreAction,
} from '@/actions/shared/pemberitahuan/data'
import { Button, Card, CardSeparator, Title } from '@/components/ui'
import { useEffect, useState } from 'react'
import useInfiniteScroll, {
  ScrollDirection,
} from 'react-easy-infinite-scroll-hook'
import PemberitahuanItem from './item'

export default function PemberitahuanBody() {
  const [data, setData] = useState<DataItemType[]>([])
  const [page, setPage] = useState<number>()

  const loadData = async (loadPage: number) => {
    const moreData = await loadMoreAction(loadPage)
    setData((prev) => [...prev, ...moreData.data])
    setPage(moreData.nextPage ?? undefined)
  }

  const loadNext = async (direction: ScrollDirection) => {
    if (direction === 'down' && !!page) {
      await loadData(page)
    }
  }

  useEffect(() => {
    loadData(1)
  }, [])

  const ref = useInfiniteScroll({
    next: loadNext,
    windowScroll: true,
    rowCount: data.length,
    hasMore: { down: !!page },
  })

  return (
    <Card className="p-0">
      <div className="flex justify-between px-2.5 py-2">
        <Title as="h4" size="1.5xl" weight="semibold">
          Pemberitahuan
        </Title>
        <Button size="sm" variant="flat" color="success">
          Tandai semua dibaca
        </Button>
      </div>
      <CardSeparator />
      <div ref={ref as any} className="flex flex-col">
        {data.map((item, idx) => (
          <PemberitahuanItem key={idx} {...item} />
        ))}
      </div>
    </Card>
  )
}
