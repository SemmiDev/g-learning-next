'use client'

import Image from 'next/image'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Checkbox, Input } from 'rizzui'
import imagePhoto from '@public/images/photo.png'
import {
  Button,
  Card,
  CardSeparator,
  Pagination,
  Text,
  Title,
} from '@/components/ui'
import { Fragment, useState } from 'react'
import UndangAnggotaModal from '@/components/page/pengajar/ruang-kelas/kelas/anggota-kelas/modal/undang-anggota'
import KeluarkanAnggotaModal from '@/components/page/pengajar/ruang-kelas/kelas/anggota-kelas/modal/keluarkan-anggota'

export default function AnggotaKelasPage() {
  const [showModalUndang, setShowModalUndang] = useState(false)
  const [showModalKeluarkan, setShowModalKeluarkan] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-start space-y-8 mt-8 lg:space-x-6 lg:space-y-0">
        <Card className="w-full lg:w-7/12 p-0">
          <div className="p-2">
            <Title as="h6" className="leading-4">
              Anggota Kelas
            </Title>
            <Text
              size="xs"
              weight="semibold"
              variant="lighter"
              className="mt-1"
            >
              List mahasiswa yang bergabung di dalam kelas
            </Text>
          </div>
          <CardSeparator />
          <div className="flex justify-between p-2">
            <Input
              size="sm"
              type="search"
              placeholder="Cari Anggota Kelas"
              clearable={true}
              className="w-72 sm:w-96"
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
            />
            <Button size="sm" onClick={() => setShowModalUndang(true)}>
              Undang Anggota
            </Button>
          </div>
          <CardSeparator />
          <div className="flex flex-col">
            {[...Array(10)].map((val, idx) => {
              return (
                <Fragment key={idx}>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 p-2">
                      <Image
                        src={imagePhoto}
                        alt="profile"
                        className="w-10 h-10 rounded-md"
                      />
                      <div className="flex flex-col justify-center">
                        <Text size="sm" weight="semibold" variant="dark">
                          Annitsa Bestweden
                        </Text>
                        <Text
                          size="2xs"
                          weight="medium"
                          variant="lighter"
                          className="mt-0.5"
                        >
                          email@namaweb.com
                        </Text>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      color="danger"
                      className="m-2"
                      onClick={() => setShowModalKeluarkan(true)}
                    >
                      Keluarkan
                    </Button>
                  </div>
                  <CardSeparator />
                </Fragment>
              )
            })}
          </div>
          <div className="flex justify-between items-center p-2">
            <Text size="2xs" variant="lighter">
              Menampilkan 10 dari 30 data
            </Text>
            <Pagination total={30} />
          </div>
        </Card>
        <Card className="w-full lg:w-4/12 p-0">
          <div className="flex flex-col p-2">
            <Title as="h6" weight="semibold" className="leading-4">
              Permintaan Bergabung
            </Title>
            <Checkbox
              size="sm"
              label="Terima semua permintaan"
              className="text-gray-lighter text-xs w-fit mt-2"
              iconClassName="h-3 top-1"
            />
          </div>
          <CardSeparator />
          <div className="flex flex-col space-y-2 p-2">
            {[...Array(4)].map((val, idx) => {
              return (
                <div key={idx} className="flex space-x-2">
                  <Checkbox size="sm" iconClassName="h-3 top-1" />
                  <Image
                    src={imagePhoto}
                    alt="profile"
                    className="w-[38px] h-[38px] rounded-md"
                  />
                  <div className="flex flex-col">
                    <Text size="sm" weight="semibold" variant="dark">
                      Annitsa Bestweden
                    </Text>
                    <Text size="2xs" weight="medium" variant="lighter">
                      email@namaweb.com
                    </Text>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm">Terima</Button>
                      <Button size="sm" color="danger">
                        Tolak
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <CardSeparator />
          <div className="p-2">
            <Button size="sm" className="w-full">
              Konfirmasi
            </Button>
          </div>
        </Card>
      </div>

      <UndangAnggotaModal
        showModal={showModalUndang}
        setShowModal={setShowModalUndang}
      />

      <KeluarkanAnggotaModal
        showModal={showModalKeluarkan}
        setShowModal={setShowModalKeluarkan}
      />
    </>
  )
}
