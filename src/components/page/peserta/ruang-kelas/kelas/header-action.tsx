'use client'

import { ActionIcon } from '@/components/ui'
import { GrShareOption } from 'react-icons/gr'

export default function KelasHeaderAction() {
  return (
    <>
      <div className="flex space-x-2 items-center">
        <ActionIcon size="sm" variant="outline">
          <GrShareOption size={16} />
        </ActionIcon>
      </div>
    </>
  )
}
