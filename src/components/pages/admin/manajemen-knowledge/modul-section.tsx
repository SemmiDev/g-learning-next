import cn from '@/utils/class-names'
import dynamic from 'next/dynamic'

const ModulSortable = dynamic(() => import('./modul-sortable'), { ssr: false })

type ModulSectionProps = {
  className?: string
}

export default function ModulSection({ className }: ModulSectionProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <ModulSortable />
    </div>
  )
}
