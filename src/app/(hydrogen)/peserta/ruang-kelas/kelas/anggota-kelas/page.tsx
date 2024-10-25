'use client'

import { Card, CardSeparator, Pagination, Text, Title } from '@/components/ui'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { Fragment } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'

export default function AnggotaKelasPage() {
  const listAnggota = [...Array(10)].map((_, idx) => ({
    nama: 'Annitsa Bestweden',
    email: 'email@namaweb.com',
    image: imagePhoto,
    level: idx === 0 ? 'Pengajar' : 'Peserta',
  }))

  return (
    <div className="flex flex-wrap items-start space-y-8 mt-8 lg:space-x-6 lg:space-y-0">
      <Card className="w-full lg:w-7/12 p-0">
        <div className="p-2">
          <Title as="h6" className="leading-4">
            Anggota Kelas
          </Title>
          <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
            List anggota yang bergabung di dalam kelas
          </Text>
        </div>
        <CardSeparator />
        <div className="flex p-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Anggota Kelas"
            clearable
            className="w-72 sm:w-96"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
          />
        </div>
        <CardSeparator />
        <div className="flex flex-col">
          {listAnggota.map((item, idx) => (
            <Fragment key={idx}>
              <div className="flex justify-between items-center space-x-2 p-2">
                <div className="flex space-x-3">
                  <Image
                    src={item.image}
                    alt="profil"
                    className="size-10 rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <Text size="sm" weight="semibold" variant="dark">
                      {item.nama}
                    </Text>
                    <Text
                      size="2xs"
                      weight="medium"
                      variant="lighter"
                      className="mt-0.5"
                    >
                      {item.email}
                    </Text>
                  </div>
                </div>
                <Text size="2xs" weight="semibold" variant="lighter">
                  {item.level}
                </Text>
              </div>
              <CardSeparator />
            </Fragment>
          ))}
        </div>
        <div className="flex justify-between items-center p-2">
          <Text size="2xs" variant="lighter">
            Menampilkan 10 dari 30 data
          </Text>
          <Pagination total={30} />
        </div>
      </Card>
    </div>
  )
}
