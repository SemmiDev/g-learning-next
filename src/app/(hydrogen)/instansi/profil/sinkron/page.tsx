'use client'

import SinkronDiktiCard from '@/components/page/instansi/profil/sinkron/dikti-card'
import SinkronSmartCard from '@/components/page/instansi/profil/sinkron/smart-card'

export default function SinkronPage() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <SinkronDiktiCard className="w-full md:flex-1" />
      <SinkronSmartCard className="w-full md:flex-1" />
      <div className="hidden flex-1 lg:block"></div>
    </div>
  )
}
