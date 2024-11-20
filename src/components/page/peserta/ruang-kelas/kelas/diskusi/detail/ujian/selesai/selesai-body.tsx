'use client'

import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { useRouter } from 'next-nprogress-bar'

export default function SelesaiUjianBody() {
  const router = useRouter()

  return (
    <Card className="flex flex-col w-full rounded-md overflow-clip max-w-[500px] p-0">
      <div className="flex justify-center bg-success px-4 py-4">
        <Title as="h3" className="text-white">
          Judul Quiz
        </Title>
      </div>
      <div className="px-2 py-3">
        <Card className="p-0">
          <Text weight="semibold" variant="dark" className="m-2">
            Hasil Ujian
          </Text>
          <CardSeparator />
          <div className="flex p-2">
            <table className="flex-1 text-xs text-gray-dark">
              <tbody>
                <tr>
                  <td className="w-32">Jumlah pertanyaan</td>
                  <td className="w-3 text-center"> : </td>
                  <td className="font-semibold">20</td>
                </tr>
                <tr>
                  <td>Benar/ salah</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">8 / 12</td>
                </tr>
                <tr>
                  <td>Waktu mulai</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">18 Januari 2024 | 15:00:53</td>
                </tr>
                <tr>
                  <td>Waktu selesai</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">18 Januari 2024 | 17:11:03</td>
                </tr>
              </tbody>
            </table>
            <div
              className={cn(
                'flex flex-col items-center bg-gray-50 w-24 rounded-md p-3',
                'bg-red-100'
              )}
            >
              <Text size="sm" weight="medium" variant="lighter">
                Nilai
              </Text>
              <Text size="3xl" weight="bold" variant="dark" className="mt-1">
                40
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="p-2">
            <Button
              className="w-full"
              onClick={() => {
                router.replace(`${routes.peserta.kelas}/diskusi/detail/ujian`)
              }}
            >
              Kembali
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  )
}
