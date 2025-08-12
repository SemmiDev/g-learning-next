import { Card } from '@/components/ui'
import cn from '@/utils/class-names'
import { useManajemenKnowledgeArtikelStore } from './stores/artikel'
import TambahArtikelForm from './form/tambah-artikel'
import UbahArtikelForm from './form/ubah-artikel'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const { action } = useManajemenKnowledgeArtikelStore()

  if (!action) return null

  return (
    <Card className={cn('px-4 py-3', className)}>
      {action === 'tambah' ? (
        <TambahArtikelForm />
      ) : (
        action === 'ubah' && <UbahArtikelForm />
      )}
    </Card>
  )
}
