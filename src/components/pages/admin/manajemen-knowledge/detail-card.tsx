import { Card } from '@/components/ui'
import cn from '@/utils/class-names'
import { useManajemenKnowledgeArtikelStore } from './stores/artikel'
import TambahArtikelForm from './tambah-artikel-form'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const { action } = useManajemenKnowledgeArtikelStore()

  if (!action) return null

  return (
    <Card className={cn('overflow-visible px-4 py-3', className)}>
      {action === 'tambah' ? <TambahArtikelForm /> : null}
    </Card>
  )
}
