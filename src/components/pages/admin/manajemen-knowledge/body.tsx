'use client'

import DetailCard from './detail-card'
import ModulSection from './modul-section'

export default function ManajemenKnowledgeBody() {
  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <ModulSection className="col-span-12 md:col-span-4" />
      <DetailCard className="col-span-12 md:col-span-8 md:sticky md:-top-2 md:z-[995]" />
    </div>
  )
}
