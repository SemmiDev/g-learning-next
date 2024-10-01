'use client'

import { ActionIcon, Button } from '@/components/ui'
import { useState } from 'react'
import { GrShareOption } from 'react-icons/gr'
import PengaturanKelasModal from '../modal/pengaturan-kelas'
import { useParams } from 'next/navigation'

export default function KelasHeaderAction() {
  const [idPengaturan, setIdPengaturan] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  return (
    <>
      <div className="flex space-x-2 items-center">
        <ActionIcon size="sm" variant="outline">
          <GrShareOption size={16} />
        </ActionIcon>
        <Button
          size="sm"
          className="h-7"
          onClick={() => setIdPengaturan(idKelas)}
        >
          Pengaturan
        </Button>
      </div>

      <PengaturanKelasModal id={idPengaturan} setId={setIdPengaturan} />
    </>
  )
}
