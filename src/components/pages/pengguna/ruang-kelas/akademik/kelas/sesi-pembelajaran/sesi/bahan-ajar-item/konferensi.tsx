import { ModalConfirm, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsWebcam } from 'react-icons/bs'
import DropdownBahanAjar from '../pengajar/dropdown-bahan-ajar'
import UbahKonferensiSesiModal from '../pengajar/modal/ubah-konferensi'

type KonferensiItemProps = {
  kelas: DataKelasType
  data: DataType
  className?: string
}

export default function KonferensiItem({
  kelas,
  data,
  className,
}: KonferensiItemProps) {
  const { jwt } = useSessionJwt()
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

    handleActionWithToast(hapusAktifitasApi(jwt, idKelas, idHapus), {
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
          href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran/${idSesi}/konferensi/${data.aktifitas?.id}`}
          className="flex gap-x-2 px-2 py-4"
        >
          <div className="flex justify-center items-center size-[2.625rem] btn-item-red rounded shrink-0">
            <BsWebcam className="size-5" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Text size="sm" weight="semibold">
              {data.aktifitas?.judul || '-'}
            </Text>
            <Text size="sm" className="line-clamp-2">
              {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
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
          <UbahKonferensiSesiModal
            idSesi={idSesi}
            show={showUbah}
            id={keyUbah}
            onHide={doHideUbah}
          />

          <ModalConfirm
            title="Hapus Konferensi"
            desc="Apakah Anda yakin ingin menghapus konferensi ini?"
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
