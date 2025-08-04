'use client'

import { Card, TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { useQueryState } from 'nuqs'
import PengaturanPoinTab from './poin-tab'

export default function PengaturanBody() {
  const [tab] = useQueryState('tab')

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
          ]}
        />
      </Card>
      {(tab === 'poin' || tab === null) && <PengaturanPoinTab />}
    </div>
  )
}
