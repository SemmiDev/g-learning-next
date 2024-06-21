'use client'

import KomentarSectionFull from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/komentar-section-full'
import FileListItem from '@/components/shared/file/file-list-item'
import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  ReadMore,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import Image from 'next/image'
import Link from 'next/link'
import { BsFileText } from 'react-icons/bs'
import { RiArrowLeftLine } from 'react-icons/ri'
import { Checkbox } from 'rizzui'

export default function DiskusiDetailPage() {
  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.pengajar.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-8/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Diskusi + Gambar dan Video Mata Kuliah Aljabar Linier
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah diskusi yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
            </div>
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
          <FileListItem
            file={{ name: 'NamaFile.ext', size: 50 }}
            className="mx-3 my-2"
            download
          />
          <CardSeparator />
          <KomentarSectionFull className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
            Anggota Kelas
          </Title>
          <div className="flex px-2 mb-4">
            <Checkbox
              size="sm"
              label="Tandai Hadir Semua"
              className="text-gray-lighter text-xs"
              iconClassName="h-3 top-1"
            />
          </div>
          <div>
            {[...Array(10)].map((val, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center border-t-2 border-t-gray-100 p-2"
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
          <CardSeparator />
          <div className="flex justify-end m-2">
            <Button size="sm">Simpan Presensi</Button>
          </div>
        </Card>
      </div>
    </>
  )
}
