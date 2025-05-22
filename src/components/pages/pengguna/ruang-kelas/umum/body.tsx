'use client'

import { Button, Input, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import { switchCaseObject } from '@/utils/switch-case'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'
import GabungKelasModal from './modal/gabung-kelas'

export default function RuangKelasUmumBody() {
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [showBuatKelas, setShowBuatKelas] = useState(false)
  const [showGabungKelas, setShowGabungKelas] = useState(false)

  const { jenis: jenisKelas }: { jenis: string } = useParams()
  const kategori = switchCaseObject(
    jenisKelas,
    {
      dikelola: 'Dikelola',
      diikuti: 'Diikuti',
    },
    undefined
  ) as 'Dikelola' | 'Diikuti' | undefined

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
            Semua Kelas {!!kategori ? `yang ${kategori}` : ''}
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

      <div className="flex flex-col gap-4">
        <Input
          placeholder="Cari Kelas"
          className="md:w-72"
          size="sm"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />

        <ListKelasCardList kategori={kategori} search={search} />
      </div>

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
