'use client'

import { Button, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { switchCaseObject } from '@/utils/switch-case'
import _ from 'lodash'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'
import GabungKelasModal from './modal/gabung-kelas'

export default function RuangKelasUmumBody() {
  const [showBuatKelas, setShowBuatKelas] = useState(false)
  const [showGabungKelas, setShowGabungKelas] = useState(false)

  const { jenis: jenisKelas }: { jenis: string } = useParams()

  return (
    <>
      <div className="flex justify-between items-start gap-2 flex-wrap mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-1"
          >
            Semua Kelas {!!jenisKelas ? `yang ${_.startCase(jenisKelas)}` : ''}
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            {switchCaseObject(
              jenisKelas,
              {
                dikelola: 'Semua kelas yang Kamu buat dan bisa dikelola',
                diikuti: 'Semua daftar kelas yang Kamu ikuti',
              },
              ''
            )}
          </Text>
        </div>
        <div className="flex justify-end flex-wrap gap-2">
          {(!jenisKelas || jenisKelas === 'diikuti') && (
            <>
              <Link href={routes.pengguna.temukanKelas}>
                <Button size="sm" color="primary" className="text-nowrap">
                  Temukan Kelas
                </Button>
              </Link>
              <Button
                size="sm"
                color="info"
                className="text-nowrap"
                onClick={() => setShowGabungKelas(true)}
              >
                Gabung Kelas
              </Button>
            </>
          )}
          {(!jenisKelas || jenisKelas === 'dikelola') && (
            <Button
              size="sm"
              className="text-nowrap"
              onClick={() => setShowBuatKelas(true)}
            >
              Buat Kelas
            </Button>
          )}
        </div>
      </div>

      <ListKelasCardList />

      {(!jenisKelas || jenisKelas === 'diikuti') && (
        <GabungKelasModal show={showGabungKelas} setShow={setShowGabungKelas} />
      )}

      {(!jenisKelas || jenisKelas === 'dikelola') && (
        <BuatKelasModal
          showModal={showBuatKelas}
          setShowModal={setShowBuatKelas}
        />
      )}
    </>
  )
}
