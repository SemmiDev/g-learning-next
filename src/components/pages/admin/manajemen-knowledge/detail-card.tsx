import { Card, Modal } from '@/components/ui'
import { useMinViewportSize } from '@/hooks/viewport-size/use-min-size'
import cn from '@/utils/class-names'
import { useEffect, useState } from 'react'
import TambahArtikelForm from './form/tambah-artikel'
import UbahArtikelForm from './form/ubah-artikel'
import { useManajemenKnowledgeArtikelStore } from './stores/artikel'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const atMinSizeMd = useMinViewportSize('md')
  const { action, tutupArtikel } = useManajemenKnowledgeArtikelStore()

  const [showModal, setShowModal] = useState(false)

  const handleTutupArtikel = () => {
    setShowModal(false)
    setTimeout(() => tutupArtikel(), 250)
  }

  useEffect(() => {
    if (action) setShowModal(true)
  }, [action])

  const ArtikelForm =
    action === 'tambah' ? (
      <TambahArtikelForm
        showHeader={atMinSizeMd}
        onClose={handleTutupArtikel}
      />
    ) : (
      action === 'ubah' && (
        <UbahArtikelForm
          showHeader={atMinSizeMd}
          onClose={handleTutupArtikel}
        />
      )
    )

  if (atMinSizeMd) {
    if (!action) return null

    return <Card className={cn('px-4 py-3', className)}>{ArtikelForm}</Card>
  }

  return (
    <Modal
      size="full"
      title={action === 'tambah' ? 'Tambah Artikel' : 'Ubah Artikel'}
      isOpen={showModal}
      onClose={handleTutupArtikel}
    >
      {ArtikelForm}
    </Modal>
  )
}
