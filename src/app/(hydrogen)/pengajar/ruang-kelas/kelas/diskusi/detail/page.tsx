'use client'

import { routes } from '@/config/routes'
import Link from 'next/link'
import { ActionIcon, Button, Checkbox, Text, Textarea, Title } from 'rizzui'
import { RiArrowLeftLine } from 'react-icons/ri'
import {
  BsChatSquareText,
  BsFileText,
  BsFillSendFill,
  BsThreeDots,
} from 'react-icons/bs'
import Image from 'next/image'
import Card from '@/components/ui/card'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import { ReadMoreWeb } from 'react-shorten'
import CardSeparator from '@/components/ui/card-separator'
import { FaChevronDown } from 'react-icons/fa'

export default function DiskusiDetailPage() {
  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.kelas}>
          <Button variant="text" className="text-gray-dark hover:text-primary">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text className="text-base font-medium ml-2">Kembali</Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-8/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text className="text-base font-semibold text-gray-dark">
                Judul Diskusi + Gambar dan Video Mata Kuliah Aljabar Linier
              </Text>
              <Text className="text-2xs">
                <ReadMoreWeb
                  truncate={100}
                  showMoreText="Lihat Selengkapnya"
                  showLessText=""
                  className="text-primary font-medium hover:text-primary-dark"
                >
                  Ini merupakan catatan dari sebuah diskui yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskui yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMoreWeb>
              </Text>
            </div>
            <Button size="sm" variant="text">
              <BsThreeDots size={18} />
            </Button>
          </div>
          <CardSeparator />
          <div className="flex flex-col px-4 py-2">
            <div className="flex justify-center mt-4">
              <div className="flex max-w-8/12 max-h-60">
                <Image
                  src={imagePreview}
                  alt="preview"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <CardSeparator />
          <div className="flex justify-between items-center bg-gray-50 rounded-md mx-4 my-2 p-2">
            <div className="flex items-center space-x-1">
              <BsFileText className="text-primary-lighter" size={32} />
              <div className="flex flex-col">
                <Text className="text-sm text-gray-dark font-medium leading-4">
                  NamaFile.ext
                </Text>
                <Text className="text-[.75rem] text-gray-dark leading-4">
                  ukuranfile
                </Text>
              </div>
            </div>
            <Button size="sm" variant="text" className="text-sm">
              Unduh
            </Button>
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
                <Text className="text-2xs font-semibold">6 Komentar</Text>
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
                  <Text className="text-base font-semibold">Anjal Karman</Text>
                  <Text className="text-base leading-5">
                    ini adalah komentar dari user yang membuat komentar ini
                    adalah komentar dari user yang membuat komentar ini adalah
                    komentar dari user yang membuat komentar ini adalah komentar
                    dari user yang membuat komentar
                  </Text>
                  <div className="flex space-x-2">
                    <Text className="text-sm">4 hari</Text>
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
          <Title as="h6" className="text-base px-3 py-2">
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
                <>
                  <CardSeparator />
                  <div className="flex justify-between items-center px-3 py-2">
                    <div className="flex space-x-3">
                      <Image
                        src={imagePhoto}
                        alt="profile"
                        className="w-10 h-10 rounded-md"
                      />
                      <div className="flex flex-col">
                        <Text className="text-sm text-gray-dark font-semibold">
                          Annitsa Bestweden
                        </Text>
                        <Text className="text-[.625rem] text-gray-lighter font-medium">
                          email@namaweb.com
                        </Text>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ActionIcon size="sm" rounded="lg">
                        H
                      </ActionIcon>
                      <ActionIcon size="sm" rounded="lg" variant="outline">
                        I
                      </ActionIcon>
                      <ActionIcon size="sm" rounded="lg" variant="outline">
                        A
                      </ActionIcon>
                      <ActionIcon size="sm" rounded="lg" variant="outline">
                        S
                      </ActionIcon>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </Card>
      </div>
    </>
  )
}
