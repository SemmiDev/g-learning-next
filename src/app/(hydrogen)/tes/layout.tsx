import { Title } from '@/components/ui'
import { ReactNode } from 'react'

export default function TesLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      <Title>Tes Layout</Title>
      {children}
      {modal}
    </>
  )
}
