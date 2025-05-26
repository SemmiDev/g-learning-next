'use client'

import { Button, ButtonSubmit, Card, Loader, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { gabungAnggotaKelasApi } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/peserta/gabung'
import { lihatUndanganKelasApi } from '@/services/api/pengguna/undangan-kelas/lihat'
import { handleActionWithToast } from '@/utils/action'
import { useRouter } from '@bprogress/next/app'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'

export default function UndanganKelasBody() {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id: idPengguna } = useSessionPengguna()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { kelas: kodeKelas }: { kelas: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['undangan-kelas.detail', kodeKelas],
    queryFn: async () => {
      const { data, success, error } = await processApi(
        lihatUndanganKelasApi,
        kodeKelas
      )

      if (!success) {
        toast.error('Link undangan kelas tidak valid')

        router.replace(routes.pengguna.ruangKelas.diikuti.umum)

        throw error
      }

      if (data?.id_pengajar === idPengguna) {
        router.replace(`${routes.pengguna.ruangKelas.dikelola.umum}/${data.id}`)
      } else if (data?.status_gabung) {
        if (data?.status_gabung === 'Diterima') {
          toast.success(`Anda telah bergabung di kelas ${data.nama_kelas}`)

          router.replace(
            `${routes.pengguna.ruangKelas.diikuti.umum}/${data.id}`
          )
        } else if (data?.status_gabung === 'Pengajuan') {
          toast.success(
            `Sedang menunggu persetujuan bergabung di kelas ${data.nama_kelas}`
          )

          router.replace(routes.pengguna.ruangKelas.diikuti.umum)
        }
      }

      return data
    },
  })

  const handleGabungKelas = async () => {
    await handleActionWithToast(processApi(gabungAnggotaKelasApi, kodeKelas), {
      loading: 'Mengajukan bergabung...',
      success: 'Berhasil mengajukan bergabung',
      onStart: () => setIsSubmitting(true),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.list', 'Diikuti', 'Umum'],
        })

        router.replace(routes.pengguna.ruangKelas.diikuti.umum)
      },
    })
  }

  if (isLoading || !data) return <Loader />

  return (
    <Card className="flex flex-col items-center w-[600px] max-w-full py-8 px-2 mx-2 sm:px-8 sm:mx-4">
      <div className="size-20 rounded overflow-clip mb-6">
        {!!data.thumbnail ? (
          <Image
            src={data.thumbnail}
            alt="kelas"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage
            persistentKey={data.id}
            alt="kelas"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <Text size="xs" weight="medium" align="center" className="mb-1">
        Anda diundang untuk bergabung di kelas
      </Text>
      <Text
        weight="bold"
        variant="dark"
        className="text-xl mb-0.5 xs:text-2xl xs:mb-0.5"
      >
        {data?.nama_kelas}
      </Text>
      <div className="flex justify-center gap-x-4 gap-y-1 flex-wrap">
        <div className="inline-flex items-center gap-x-1">
          <div className="size-2.5 bg-gray-lighter rounded-full shrink-0"></div>
          <Text size="xs" weight="semibold">
            {data.pengajar.map((pengajar, idx) => (
              <Fragment key={idx}>
                {pengajar.nama}
                {idx < data.pengajar.length - 1 && ', '}
                <br />
              </Fragment>
            ))}
          </Text>
        </div>
        <div className="inline-flex items-center gap-x-1">
          <div className="size-2.5 bg-primary rounded-full shrink-0"></div>
          <Text size="xs" weight="semibold">
            Kelas {data?.tipe || '-'}
          </Text>
        </div>
        <div className="inline-flex items-center gap-x-1">
          <div className="size-2.5 bg-success rounded-full shrink-0"></div>
          <Text size="xs" weight="semibold">
            {data?.total_peserta || 0} Peserta
          </Text>
        </div>
      </div>
      <SanitizeHTML
        html={data?.deskripsi || ''}
        className="text-sm font-medium mt-4"
      />
      {data.id_pengajar === idPengguna ? (
        <Button className="w-full mt-6" disabled>
          Anda Pemilik Kelas Ini
        </Button>
      ) : (
        <ButtonSubmit
          onClick={handleGabungKelas}
          isSubmitting={isSubmitting}
          disabled={!!data?.status_gabung}
          className="w-full mt-6"
        >
          Ajukan Bergabung
        </ButtonSubmit>
      )}
    </Card>
  )
}
