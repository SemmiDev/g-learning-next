'use client'

import SinkronDiktiCard from './dikti-card'
import SinkronSmartCard from './smart-card'

export default function SinkronBody() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <SinkronDiktiCard className="w-full md:flex-1"></SinkronDiktiCard>
      <SinkronSmartCard className="w-full md:flex-1"></SinkronSmartCard>
      <div className="hidden flex-1 lg:block"></div>
    </div>
  )
}
