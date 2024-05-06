'use client'

import PustakaMedia from '@/components/shared/pustaka-media'
import { Input } from '@/components/ui'
import Select from '@/components/ui/select'
import { useState } from 'react'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

export default function Tes2Page() {
  const [value, setValue] = useState(0)

  return (
    <div className="space-y-4">
      <PustakaMedia />
      <Input label="Aaaa Baaa" />
      <Select
        label="Testing Select"
        placeholder="Pilih Satu"
        options={options}
        isClearable
      />
    </div>
  )
}
