import { Card, CardSeparator, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import Image from 'next/image'
import DropdownMoreAction from './dropdown-more-action'
import KomentarSectionZero from './komentar-section-zero'

export default function InformasiCard({ className }: { className?: string }) {
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
        <DropdownMoreAction />
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
          Judul Informasi
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
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
      <KomentarSectionZero className="pt-4 px-4 pb-2" />
    </Card>
  )
}
