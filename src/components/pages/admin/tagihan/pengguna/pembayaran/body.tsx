'use client'

import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { useRouter } from '@bprogress/next/app'
import Link from 'next/link'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import TambahModal from './modal/tambah'
import TablePembayaranTagihanPenggunaCard from './table-card'

export default function PembayaranTagihanPenggunaBody() {
  const router = useRouter()
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-2">
          <Link
            href={routes.admin.tagihanPengguna}
            onClick={() => router.back()}
          >
            <Button
              as="span"
              variant="text"
              color="primary"
              className="text-gray-dark"
            >
              <RiArrowLeftLine size={18} className="" />{' '}
              <Text weight="medium" className="ml-2">
                Kembali
              </Text>
            </Button>
          </Link>

          <Button size="sm" onClick={() => setShowTambah(true)}>
            Pembayaran Baru
          </Button>
        </div>

        <TablePembayaranTagihanPenggunaCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
