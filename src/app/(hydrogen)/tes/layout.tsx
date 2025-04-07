import { Title } from '@/components/ui'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export default function TesLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <>
      <Title>Tes Layout</Title>
      {children}
      {modal}
    </>
  )
}
