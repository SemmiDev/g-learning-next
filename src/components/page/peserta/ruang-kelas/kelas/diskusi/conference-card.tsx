import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { BsCameraVideo } from 'react-icons/bs'
import KomentarSectionFull from './komentar-section-full'

export default function ConferenceCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Prabroro Janggar
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              30 Menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h5" weight="semibold" className="text-[1.375rem] mb-2">
          Judul Conference
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
      </div>
      <CardSeparator />
      <div className="p-2">
        {/* <Link href={`${routes.peserta.kelas}/diskusi/detail/conference`}> */}
        <Button size="sm" color="primary" className="w-full">
          <BsCameraVideo size={16} className="me-2" /> Masuk Kelas
        </Button>
        {/* </Link> */}
        <KomentarSectionFull className="pt-4 px-2 pb-2" />
      </div>
    </Card>
  )
}
