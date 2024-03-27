import { ReactNode } from 'react'
import { Title } from 'rizzui'

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
