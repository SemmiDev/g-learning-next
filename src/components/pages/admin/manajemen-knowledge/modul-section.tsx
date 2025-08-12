import { useSessionJwt } from '@/hooks/use-session-jwt'
import { ubahTreeKnowledgeApi } from '@/services/api/admin/knowledge/modul/ubah-tree'
import cn from '@/utils/class-names'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { PiSealCheck, PiSpinner } from 'react-icons/pi'
import { useManajemenKnowledgeSortableStore } from './stores/sortable'

const ModulSortable = dynamic(() => import('./modul-sortable'), { ssr: false })

type ModulSectionProps = {
  className?: string
}

export default function ModulSection({ className }: ModulSectionProps) {
  const { processApi } = useSessionJwt()

  const { isSaving, itemsSaved, items } = useManajemenKnowledgeSortableStore()

  const [showSaved, setShowSaved] = useState(false)

  const handleSave = async () => {
    const data = items
      .filter((item) => item.action !== 'ADD')
      .map((item, idx) => ({
        id_modul: item.id as string,
        urutan: idx + 1,
        artikel: (item.children ?? [])
          .filter((item2) => item2.action !== 'ADD')
          .map((item2, idx2) => ({
            id_artikel: item2.id as string,
            urutan: idx2 + 1,
          })),
      }))

    await processApi(ubahTreeKnowledgeApi, data)

    itemsSaved()
  }

  useEffect(() => {
    if (isSaving) {
      setShowSaved(true)
      handleSave()
    } else {
      setTimeout(() => setShowSaved(false), 1500)
    }
  }, [isSaving])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        className={cn(
          'place-items-end opacity-0 transition-opacity duration-500 pr-3',
          {
            'opacity-100': showSaved,
          }
        )}
      >
        {isSaving ? (
          <PiSpinner className="animate-spin text-gray-dark" />
        ) : (
          <PiSealCheck className="text-primary-dark" />
        )}
      </div>
      <div className="grid gap-2">
        <ModulSortable />
      </div>
    </div>
  )
}
