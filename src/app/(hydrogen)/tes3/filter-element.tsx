'use client'

import { PiTrashDuotone } from 'react-icons/pi'
import { Button } from 'rizzui'

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
      Testing
      {isFiltered ? (
        <Button
          size="sm"
          onClick={onReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  )
}
