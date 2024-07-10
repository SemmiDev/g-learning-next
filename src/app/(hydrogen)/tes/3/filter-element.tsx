'use client'

import { Button, Input } from '@/components/ui'
import { AnyObject } from '@/utils/type-interface'
import { AiOutlineClear } from 'react-icons/ai'

type FilterElementProps = {
  isFiltered: boolean
  filters: AnyObject
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
        value={filters.nama ?? ''}
        onChange={(e) => updateFilter('nama', e.target.value)}
        onClear={() => updateFilter('nama', '')}
        clearable
      />
      <Input
        label="Email"
        value={filters.email ?? ''}
        onChange={(e) => updateFilter('email', e.target.value)}
        onClear={() => updateFilter('email', '')}
        clearable
      />
      {isFiltered ? (
        <Button size="sm" variant="flat" color="warning" onClick={onReset}>
          <AiOutlineClear size={15} className="me-1.5" /> Bersikan Filter
        </Button>
      ) : null}
    </>
  )
}
