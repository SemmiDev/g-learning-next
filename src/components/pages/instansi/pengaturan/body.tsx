'use client'

import { Card, TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import PengaturanPoinTab from './poin-tab'
import PengaturanPresensiTab from './presensi-tab'
import PengaturanSesiTab from './sesi-tab'

export default function PengaturanBody() {
  const [tab] = useQueryState(
    'tab',
    parseAsStringLiteral(['poin', 'sesi', 'presensi'] as const)
  )

  return (
    <div className="flex flex-col gap-4">
      <Card className="pt-0">
        <TabGroup
          path={routes.instansi.pengaturan}
          type="param"
          items={[
            {
              text: 'Pengaturan Poin',
              slugAlias: 'poin',
            },
            {
              text: 'Pengaturan Sesi',
              slug: 'sesi',
            },
            {
              text: 'Pengaturan Presensi',
              slug: 'presensi',
            },
          ]}
        />
      </Card>
      {(tab === 'poin' || tab === null) && <PengaturanPoinTab />}
      {tab === 'sesi' && <PengaturanSesiTab />}
      {tab === 'presensi' && <PengaturanPresensiTab />}
    </div>
  )
}
