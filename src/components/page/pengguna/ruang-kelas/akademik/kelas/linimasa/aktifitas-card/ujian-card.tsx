import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  Komentar,
  ModalConfirm,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsCardChecklist } from 'react-icons/bs'
import DropdownMoreAction from '../dropdown-more-action'
import UbahUjianModal from '../modal/ubah-ujian'

type UjianCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function UjianCard({ kelas, data, className }: UjianCardProps) {
  const queryClient = useQueryClient()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { id: idPengguna } = useSessionPengguna()
  const { kelas: idKelas }: { kelas: string } = useParams()

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasAction(idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
        })
      },
    })
  }

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  if (!data.aktifitas) return null

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex items-center gap-x-3">
            <Thumbnail
              src={data.pembuat?.foto}
              alt="profil"
              size={48}
              rounded="lg"
              avatar={data.pembuat?.nama}
            />
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {data.pembuat?.nama}
              </Text>
              <Text size="xs" weight="medium" variant="lighter">
                <Time date={data.aktifitas.created_at} fromNow />
              </Text>
            </div>
          </div>
          <DropdownMoreAction
            onEdit={() => doShowUbah(data.aktifitas?.id || '')}
            showEdit={data.aktifitas.id_pembuat === idPengguna}
            onDelete={() => setIdHapus(data.aktifitas?.id)}
            showDelete={
              data.aktifitas.id_pembuat === idPengguna ||
              kelas?.peran === 'Pengajar'
            }
          />
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
            {data.aktifitas.judul}
          </Title>
          <Text size="sm" variant="dark" className="truncate">
            {stripHtmlAndEllipsis(data.aktifitas.deskripsi ?? '', 100)}
          </Text>

          <div className="flex items-center gap-x-2 bg-gray-50/40 border border-dashed border-gray-100 rounded-md p-2 mt-2">
            <figure className="flex justify-center items-center size-[52px] rounded btn-item-blue">
              <BsCardChecklist size={24} />
            </figure>
            <div className="flex flex-col gap-x-2 2xl:flex-row">
              <table>
                <tbody>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium w-28 sm:w-40 2xl:w-32">
                      Jumlah Soal Pilgan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center align-top w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      {data.bank_soal?.jumlah_soal_yang_digunakan}
                      {kelas?.peran === 'Pengajar'
                        ? `/${data.bank_soal?.total_soal_pilihan_ganda}`
                        : ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium">
                      Jumlah Soal Esai
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center align-top">
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
                    <td className="text-xs text-gray-dark font-semibold text-center align-top">
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
                      <td className="text-xs text-gray-dark font-semibold text-center align-top w-2">
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
                    <td className="text-xs text-gray-dark font-semibold text-center align-top">
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
                    <td className="text-xs text-gray-dark font-semibold text-center align-top">
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
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/linimasa/ujian/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" className="w-full">
              Lihat Detail Ujian
            </Button>
          </Link>
          <Komentar
            idKelas={idKelas}
            idAktifitas={data.aktifitas.id}
            total={data.total_komentar}
            invalidateQueries={[
              ['pengguna.ruang-kelas.linimasa.list', idKelas],
            ]}
            className="pt-4 px-2 pb-2"
          />
        </div>
      </Card>

      <UbahUjianModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

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
  )
}
