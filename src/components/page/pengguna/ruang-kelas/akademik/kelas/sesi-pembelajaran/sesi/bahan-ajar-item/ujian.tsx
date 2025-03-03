import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import { ModalConfirm, Text, Time } from '@/components/ui'
import { routes } from '@/config/routes'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsCardChecklist } from 'react-icons/bs'
import DropdownBahanAjar from '../pengajar/dropdown-bahan-ajar'
import UbahUjianSesiModal from '../pengajar/modal/ubah-ujian'

type UjianItemProps = {
  kelas: DataKelasType
  data: DataType
  className?: string
}

export default function UjianItem({ kelas, data, className }: UjianItemProps) {
  const queryClient = useQueryClient()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasAction(idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.list',
            idKelas,
            idSesi,
          ],
        })
      },
    })
  }

  const jenisKelas = kelas.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  if (!data.aktifitas) return null

  return (
    <>
      <div className={cn('relative hover:bg-gray-50', className)}>
        <Link
          href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran/${idSesi}/ujian/${data.aktifitas?.id}`}
          className="flex gap-x-2 px-2 py-4"
        >
          <div className="flex justify-center items-center size-[2.625rem] btn-item-blue rounded shrink-0">
            <BsCardChecklist className="size-5" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Text size="sm" weight="semibold">
              {data.aktifitas?.judul || '-'}
            </Text>
            <Text size="sm" className="line-clamp-2 lg:line-clamp-1">
              {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
            </Text>
            <div className="flex flex-col gap-x-3 2xl:flex-row">
              <table>
                <tbody>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium w-28 sm:w-40 2xl:w-32">
                      Jumlah Soal Pilgan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      {data.bank_soal?.jumlah_soal_yang_digunakan}/
                      {data.bank_soal?.total_soal_pilihan_ganda}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Jumlah Soal Esai
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      {data.bank_soal?.total_soal_essay}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Durasi pengerjaan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      {data.aktifitas.durasi_ujian} menit
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  {data.aktifitas.waktu_tersedia !==
                    data.aktifitas.waktu_mulai_ujian && (
                    <tr>
                      <td className="text-xs text-gray-lighter font-medium w-28 sm:w-40 2xl:w-36">
                        Waktu mulai pengerjaan
                      </td>
                      <td className="text-xs text-gray-dark font-semibold text-center w-2">
                        :
                      </td>
                      <td className="text-xs text-gray-dark font-semibold">
                        <Time
                          date={data.aktifitas.waktu_mulai_ujian}
                          format="datetime"
                          empty="-"
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Batas waktu pengerjaan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      <Time
                        date={data.aktifitas.waktu_selesai_ujian}
                        format="datetime"
                        empty="-"
                      />
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
                      {data.aktifitas.kategori_nilai}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Link>

        {kelas.peran === 'Pengajar' && (
          <DropdownBahanAjar
            onEdit={() => doShowUbah(data.aktifitas?.id || '')}
            onDelete={() => setIdHapus(data.aktifitas?.id)}
          />
        )}
      </div>

      {kelas.peran === 'Pengajar' && (
        <>
          <UbahUjianSesiModal
            idSesi={idSesi}
            show={showUbah}
            id={keyUbah}
            onHide={doHideUbah}
          />

          <ModalConfirm
            title="Hapus Ujian"
            desc="Apakah Anda yakin ingin menghapus ujian ini?"
            color="danger"
            isOpen={!!idHapus}
            onClose={() => setIdHapus(undefined)}
            onConfirm={handleHapus}
            headerIcon="help"
            closeOnCancel
          />
        </>
      )}
    </>
  )
}
