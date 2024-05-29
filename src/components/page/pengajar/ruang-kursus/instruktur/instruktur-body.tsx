import { Button, Text } from '@/components/ui'
import emptyIcon from '@public/icons/empty.png'
import Image from 'next/image'

export default function RuangKursusInstrukturBody() {
  return <EmptyBody />
}

function EmptyBody() {
  return (
    <div className="flex flex-col items-center pt-20">
      <figure className="size-48">
        <Image src={emptyIcon} alt="Kosong" />
      </figure>
      <Text weight="bold" className="text-[1.375rem] mt-4">
        Kursus Anda masih kosong!
      </Text>
      <Button className="mt-2">Mulai Buat Kursus</Button>
    </div>
  )
}
