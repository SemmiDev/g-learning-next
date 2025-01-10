'use client'

import { ModalConfirm } from '@/components/ui'
import SesiItemCard, { SesiItemType } from './sesi-item-card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'

export default function SesiPembelajaranBody() {
  const [mulaiModal, setMulaiModal] = useState(false)
  const [akhiriModal, setAkhiriModal] = useState(false)

  const router = useRouter()

  const listSesi: SesiItemType[] = [
    {
      judul: 'Judul sesi 1',
      sesi: 1,
      status: 'selesai',
      jumlahBahanAjar: 3,
      tanggal: '2024-12-02',
      jamMulai: '08:00',
      jamSelesai: '10:00',
      ruangan: 'GB 202',
    },
    {
      judul: 'Judul sesi 2',
      sesi: 2,
      status: 'sedang',
      jumlahBahanAjar: 3,
      tanggal: '2024-12-09',
      jamMulai: '08:00',
      jamSelesai: '10:00',
      ruangan: 'GB 202',
    },
    {
      judul: 'Judul sesi 3',
      sesi: 3,
      status: 'belum',
      hari: 'Senin',
      jamMulai: '08:00',
      jamSelesai: '10:00',
      ruangan: 'GB 202',
    },
    ...[...Array(7)].map(
      (_, idx) =>
        ({
          judul: `Judul sesi ${4 + idx}`,
          sesi: 4 + idx,
          status: 'belum',
          hari: 'Senin',
          jamMulai: '08:00',
          jamSelesai: '10:00',
          ruangan: 'GB 202',
        } as SesiItemType)
    ),
  ]

  return (
    <>
      <div className="flex flex-col gap-y-2 mt-8 lg:w-7/12">
        {listSesi.map((sesi, idx) => (
          <SesiItemCard
            key={idx}
            sesi={sesi}
            onMulaiSesi={() => {
              setMulaiModal(true)
            }}
            onAkhiriSesi={() => setAkhiriModal(true)}
          />
        ))}
      </div>

      <ModalConfirm
        title="Mulai Sesi"
        isOpen={mulaiModal}
        onClose={() => setMulaiModal(false)}
        desc="Apakah anda yakin ingin memulai sesi pembelajaran?"
        confirm="Ya, mulai"
        closeOnCancel
        onConfirm={() =>
          router.push(
            `${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas/sesi-pembelajaran/absensi`
          )
        }
      />

      <ModalConfirm
        title="Akhiri Sesi"
        isOpen={akhiriModal}
        onClose={() => setAkhiriModal(false)}
        desc="Apakah anda yakin ingin mengakhiri sesi pembelajaran?"
        confirm="Ya, akhiri"
        closeOnCancel
      />
    </>
  )
}
