'use client'

import { Button, Text, Title } from '@/components/ui'
import { switchCaseObject } from '@/utils/switch-case'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'
import GabungKelasModal from './modal/gabung-kelas'

type ListKelasBodyProps = {
  kategori?: 'Dikelola' | 'Diikuti'
}

export default function ListKelasBody({ kategori }: ListKelasBodyProps) {
  const [showBuatKelas, setShowBuatKelas] = useState(false)
  const [showGabungKelas, setShowGabungKelas] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-3"
          >
            Semua Kelas {!!kategori ? `yang ${kategori}` : ''}
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            {switchCaseObject(
              kategori,
              {
                Dikelola: 'Semua kelas yang Kamu buat dan bisa dikelola',
                Diikuti: 'Semua daftar kelas yang Kamu ikuti',
              },
              'Semua kelas yang terdaftar di akun Anda'
            )}
          </Text>
        </div>
        <div className="flex justify-end flex-wrap gap-2">
          {(!kategori || kategori === 'Diikuti') && (
            <Button
              size="sm"
              color="info"
              onClick={() => setShowGabungKelas(true)}
            >
              Gabung Kelas
            </Button>
          )}
          {(!kategori || kategori === 'Dikelola') && (
            <Button size="sm" onClick={() => setShowBuatKelas(true)}>
              Buat Kelas
            </Button>
          )}
        </div>
      </div>

      <ListKelasCardList kategori={kategori} />

      {(!kategori || kategori === 'Diikuti') && (
        <GabungKelasModal show={showGabungKelas} setShow={setShowGabungKelas} />
      )}

      {(!kategori || kategori === 'Dikelola') && (
        <BuatKelasModal
          showModal={showBuatKelas}
          setShowModal={setShowBuatKelas}
        />
      )}
    </>
  )
}
