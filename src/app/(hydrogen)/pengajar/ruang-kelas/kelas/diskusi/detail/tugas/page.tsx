'use client'

import { routes } from '@/config/routes'
import Link from 'next/link'
import { ActionIcon, Checkbox, Textarea } from 'rizzui'
import { RiArrowLeftLine } from 'react-icons/ri'
import { BsChatSquareText, BsFileText, BsFillSendFill } from 'react-icons/bs'
import Image from 'next/image'
import Card from '@/components/ui/card'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import CardSeparator from '@/components/ui/card-separator'
import { FaChevronDown } from 'react-icons/fa'
import { Button, ReadMore, Text, TextSpan, Title } from '@/components/ui'

export default function DiskusiDetailTugasPage() {
  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-6/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Tugas
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah tugas yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
              <Text size="sm" weight="semibold" variant="dark" className="mt-2">
                Batas Waktu Pengumpulan:{' '}
                <TextSpan color="danger">13 April 2024, 23:59 WIB </TextSpan>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="flex flex-col p-4">
            <div className="flex items-center space-x-2">
              <Image
                src={imagePhoto}
                alt="profile"
                className="w-8 h-8 rounded-md"
              />
              <Textarea
                className="flex-1"
                rows={2}
                placeholder="Tulis Komentar..."
              ></Textarea>
              <ActionIcon size="sm" variant="outline">
                <BsFillSendFill size={12} />
              </ActionIcon>
            </div>
            <div className="flex mt-2">
              <Button
                size="sm"
                variant="text"
                className="flex space-x-1 items-center text-gray-dark p-0 hover:text-primary"
              >
                <BsChatSquareText size={14} />
                <Text size="2xs" weight="semibold">
                  6 Komentar
                </Text>
              </Button>
            </div>
            <div className="ps-4 mt-2">
              <div className="flex space-x-2">
                <Image
                  src={imagePhoto}
                  alt="profile"
                  className="w-8 h-8 rounded-md"
                />
                <div className="flex flex-col items-start text-gray-dark">
                  <Text weight="semibold">Anjal Karman</Text>
                  <Text size="sm" className="leading-5">
                    ini adalah komentar dari user yang membuat komentar ini
                    adalah komentar dari user yang membuat komentar ini adalah
                    komentar dari user yang membuat komentar ini adalah komentar
                    dari user yang membuat komentar
                  </Text>
                  <div className="flex space-x-2">
                    <Text size="sm">4 hari</Text>
                    <Button
                      size="sm"
                      variant="text"
                      className="text-sm font-bold h-auto p-0"
                    >
                      Balas
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="text"
                    className="text-sm font-bold h-auto p-0"
                  >
                    <FaChevronDown className="me-1" /> 3 balasan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-3 py-2">
            Anggota Kelas
          </Title>
          <div className="flex justify-between items-center px-3 mb-4">
            <Checkbox
              size="sm"
              label="Tandai Hadir Semua"
              className="text-gray-lighter text-xs"
              iconClassName="h-3 top-1"
            />
            <Button size="sm">Simpan</Button>
          </div>
          <div>
            {[...Array(10)].map((val, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center border-t-2 border-t-gray-100 px-3 py-2"
                >
                  <div className="flex space-x-3">
                    <Image
                      src={imagePhoto}
                      alt="profile"
                      className="w-10 h-10 rounded-md"
                    />
                    <div className="flex flex-col">
                      <Text size="sm" weight="semibold" variant="dark">
                        Annitsa Bestweden
                      </Text>
                      <Text size="2xs" weight="medium" variant="lighter">
                        email@namaweb.com
                      </Text>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <ActionIcon size="sm" rounded="lg">
                      <Text size="xs" weight="semibold">
                        H
                      </Text>
                    </ActionIcon>
                    <ActionIcon size="sm" rounded="lg" variant="outline">
                      <Text size="xs" weight="semibold">
                        I
                      </Text>
                    </ActionIcon>
                    <ActionIcon size="sm" rounded="lg" variant="outline">
                      <Text size="xs" weight="semibold">
                        S
                      </Text>
                    </ActionIcon>
                    <ActionIcon size="sm" rounded="lg" variant="outline">
                      <Text size="xs" weight="semibold">
                        A
                      </Text>
                    </ActionIcon>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </>
  )
}
