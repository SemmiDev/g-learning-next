'use client'

import { Button, Card, CardSeparator, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import {
  DataItemType,
  loadMoreApi,
} from '@/services/api/shared/pemberitahuan/data'
import { useEffect, useState } from 'react'
import PemberitahuanItem from './item'

export default function PemberitahuanBody() {
  const { jwt } = useSessionJwt()

  const [data, setData] = useState<DataItemType[]>([])

  const loadData = async (loadPage: number) => {
    const moreData = await loadMoreApi(jwt, loadPage)
    setData((prev) => [...prev, ...moreData.data])
  }

  useEffect(() => {
    loadData(1)
  }, [])

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
      <div className="flex flex-col">
        {data.map((item, idx) => (
          <PemberitahuanItem key={idx} {...item} />
        ))}
      </div>
    </Card>
  )
}
