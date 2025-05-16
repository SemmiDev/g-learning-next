import { Camera, Map } from '@/components/shared/absen'
import { ButtonSubmit, Card, CardSeparator, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { absensiPesertaApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/peserta/absensi'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { useQueryClient } from '@tanstack/react-query'
import { LatLng } from 'leaflet'
import { useParams } from 'next/navigation'
import { useState } from 'react'

type PesertaAbsensiCardProps = {
  foto: boolean
  className?: string
}

export default function PesertaAbsensiCard({
  foto,
  className,
}: PesertaAbsensiCardProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [position, setPosition] = useState<LatLng>()
  const [photo, setPhoto] = useState<File>()
  const [isSending, setIsSending] = useState(false)

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const handleAbsensi = async () => {
    if (position === undefined) return

    const form = new FormData()
    form.append('latitude', position.lat.toString())
    form.append('longitude', position.lng.toString())

    if (foto && photo) form.append('swafoto', photo)

    await handleActionWithToast(
      processApi(absensiPesertaApi, idKelas, id, form),
      {
        loading: 'Menyimpan...',
        onStart: () => setIsSending(true),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.detail.materi', idKelas, id],
          })
        },
        onFinish: () => setIsSending(false),
      }
    )
  }

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h6" weight="semibold" className="px-4 py-4 leading-4">
        Presensi GPS {!!foto && ' dan Swafoto'}
      </Title>

      <CardSeparator />

      <Map
        height={foto ? 240 : 450}
        onChange={(pos) => setPosition(pos)}
        className="[&_.leaflet-control-attribution]:hidden"
      />

      {foto && <Camera onChange={(image) => setPhoto(image)} />}

      <CardSeparator />

      <div className="p-2">
        <ButtonSubmit
          className="w-full"
          onClick={handleAbsensi}
          isSubmitting={isSending}
          disabled={!(!!position && (!foto || (!!foto && !!photo)))}
        >
          Presensi dan Masuk Kelas
        </ButtonSubmit>
      </div>
    </Card>
  )
}
