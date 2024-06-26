'use client'

import MulaiUjianModal from '@/components/page/peserta/ruang-kelas/kelas/diskusi/detail/ujian/modal/mulai-ujian'
import KomentarSectionShort from '@/components/page/peserta/ruang-kelas/kelas/diskusi/komentar-section-short'
import {
  Button,
  Card,
  CardSeparator,
  ReadMore,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import imagePhoto from '@public/images/photo.png'
import Link from 'next/link'
import { useState } from 'react'
import { BsCardChecklist } from 'react-icons/bs'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function DiskusiDetailUjianPage() {
  const [showModalMulai, setShowModalMulai] = useState(false)

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.peserta.kelas}>
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
          <div className="flex items-center space-x-2 px-4 py-2">
            <Thumbnail src={imagePhoto} size={48} alt="profil" rounded="md" />
            <div className="flex flex-col">
              <Title as="h6" weight="semibold">
                Prabroro Janggar membagikan sesuatu yang baru
              </Title>
              <Text size="xs" variant="lighter">
                30 Menit
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Ujian
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah ujian yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50/40 border border-dashed border-gray-100 rounded-md p-2 mx-2 my-2">
            <figure className="flex justify-center items-center size-[52px] rounded btn-item-blue">
              <BsCardChecklist size={24} />
            </figure>
            <div className="flex flex-col gap-2 2xl:flex-row">
              <table>
                <tbody>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-28">
                      Jumlah Soal
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">20</td>
                  </tr>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Durasi pengerjaan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      90 menit
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-36">
                      Batas waktu pengerjaan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      20 Desember 2023, 23:59
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Jenis ujian
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      UTS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <CardSeparator />
          <KomentarSectionShort className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
            Hasil Ujian
          </Title>
          <CardSeparator />
          <div className="flex p-2">
            <table className="flex-1 text-xs text-gray-dark">
              <tbody>
                <tr>
                  <td className="w-32">Jumlah pertanyaan</td>
                  <td className="w-3 text-center"> : </td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Benar/ salah</td>
                  <td className="text-center"> : </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Waktu mulai</td>
                  <td className="text-center"> : </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Waktu selesai</td>
                  <td className="text-center"> : </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col items-center bg-gray-50 w-24 rounded-md p-3">
              <Text size="sm" weight="medium" variant="lighter">
                Nilai
              </Text>
              <Text size="3xl" weight="bold" variant="dark" className="mt-1">
                -
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="flex flex-col p-2">
            <Button onClick={() => setShowModalMulai(true)}>Mulai ujian</Button>
          </div>
        </Card>
      </div>

      <MulaiUjianModal
        showModal={showModalMulai}
        setShowModal={setShowModalMulai}
      />
    </>
  )
}
