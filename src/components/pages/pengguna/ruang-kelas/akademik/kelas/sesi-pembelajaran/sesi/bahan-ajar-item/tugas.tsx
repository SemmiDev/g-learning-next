import { hapusAktifitasAction } from '@/services/api/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { ModalConfirm, Text, TextSpan, Time } from '@/components/ui'
import { routes } from '@/config/routes'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { passedTime } from '@/utils/time'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsClipboardPlus } from 'react-icons/bs'
import { LuBook } from 'react-icons/lu'
import DropdownBahanAjar from '../pengajar/dropdown-bahan-ajar'
import UbahTugasSesiModal from '../pengajar/modal/ubah-tugas'

type TugasItemProps = {
  kelas: DataKelasType
  data: DataType
  className?: string
}

export default function TugasItem({ kelas, data, className }: TugasItemProps) {
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
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
            'pengajar',
            idKelas,
            idSesi,
          ],
        })
      },
    })
  }

  const jenisKelas = kelas.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  return (
    <>
      <div className={cn('relative', className)}>
        <Link
          href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran/${idSesi}/tugas/${data.aktifitas?.id}`}
          className="flex gap-x-2 px-2 py-4"
        >
          <div className="flex justify-center items-center size-[2.625rem] btn-item-violet rounded shrink-0">
            <BsClipboardPlus className="size-5" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Text size="sm" weight="semibold">
              {data.aktifitas?.judul || '-'}
            </Text>
            <Text size="sm" className="line-clamp-2">
              {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
            </Text>
            {data.aktifitas?.batas_waktu && (
              <Text size="sm" weight="semibold">
                Batas Waktu Pengumpulan:{' '}
                <TextSpan
                  color={
                    passedTime(data.aktifitas.batas_waktu) ? 'danger' : 'gray'
                  }
                >
                  <Time
                    date={data.aktifitas.batas_waktu}
                    format="datetime"
                    empty="-"
                  />
                </TextSpan>
              </Text>
            )}
            <Text size="sm" variant="lighter" className="flex items-center">
              <LuBook className="size-3 mr-1" />
              {data.file_aktifitas?.length} Berkas
            </Text>
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
          <UbahTugasSesiModal
            idSesi={idSesi}
            show={showUbah}
            id={keyUbah}
            onHide={doHideUbah}
          />

          <ModalConfirm
            title="Hapus Tugas"
            desc="Apakah Anda yakin ingin menghapus tugas ini?"
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
