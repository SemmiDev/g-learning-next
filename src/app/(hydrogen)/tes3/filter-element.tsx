'use client'

import { Button, Input } from '@/components/ui'
import { AiOutlineClear } from 'react-icons/ai'

type FilterElementProps = {
  isFiltered: boolean
  filters: { [key: string]: any }
  updateFilter: (columnId: string, filterValue: string | any[]) => void
  onReset: () => void
}

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  onReset,
}: FilterElementProps) {
  return (
    <>
      <Input
        label="Nama"
        onChange={(e) => updateFilter('nama', e.target.value)}
        value={filters.nama ?? ''}
      />
      <Input
        label="Email"
        onChange={(e) => updateFilter('email', e.target.value)}
        value={filters.email ?? ''}
      />
      {isFiltered ? (
        <Button size="sm" variant="flat" color="warning" onClick={onReset}>
          <AiOutlineClear size={15} className="me-1.5" /> Bersikan Filter
        </Button>
      ) : null}
    </>
  )
}
