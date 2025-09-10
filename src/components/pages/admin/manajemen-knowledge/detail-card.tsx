import { Card, Modal } from '@/components/ui'
import { useMinViewportSize } from '@/hooks/viewport-size/use-min-size'
import cn from '@/utils/class-names'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import TambahArtikelForm from './form/tambah-artikel'
import UbahArtikelForm from './form/ubah-artikel'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const atMinSizeMd = useMinViewportSize('md')

  const [tambahArtikel, setTambahArtikel] = useQueryState('tambah-artikel')
  const [ubahArtikel, setUbahArtikel] = useQueryState('ubah-artikel')

  const [showModal, setShowModal] = useState(false)

  const handleTutupArtikel = () => {
    setShowModal(false)
    setTimeout(() => {
      setTambahArtikel(null)
      setUbahArtikel(null)
    }, 250)
  }

  useEffect(() => {
    if (tambahArtikel || ubahArtikel) setShowModal(true)
    else setShowModal(false)
  }, [tambahArtikel, ubahArtikel])

  const ArtikelForm = tambahArtikel ? (
    <TambahArtikelForm showHeader={atMinSizeMd} onClose={handleTutupArtikel} />
  ) : (
    !!ubahArtikel && (
      <UbahArtikelForm showHeader={atMinSizeMd} onClose={handleTutupArtikel} />
    )
  )

  if (atMinSizeMd) {
    if (!tambahArtikel && !ubahArtikel) return null

    return <Card className={cn('px-4 py-3', className)}>{ArtikelForm}</Card>
  }

  return (
    <Modal
      size="full"
      title={tambahArtikel ? 'Tambah Artikel' : 'Ubah Artikel'}
      isOpen={showModal}
      onClose={handleTutupArtikel}
    >
      {ArtikelForm}
    </Modal>
  )
}
