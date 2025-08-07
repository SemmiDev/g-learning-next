import { Button, Card, Text, TextSpan, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'
import { useRouter } from '@bprogress/next/app'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'

type JudulSoalCardProps = {
  judul: string
  className?: string
}

export default function JudulSoalCard({
  judul,
  className,
}: JudulSoalCardProps) {
  const { setOpenSidebarMenu } = useGlobalStore()
  const router = useRouter()

  const {
    kategori: idKategori,
    soal: idBankSoal,
  }: { kategori: string; soal: string } = useParams()

  return (
    <Card
      className={cn(
        'flex justify-between items-center gap-2 px-4 py-3.5',
        className
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="text-lg line-clamp-1 mb-1 lg:text-1.5xl"
            title={judul}
          >
            {judul}
          </Title>
        </div>
        <Text size="sm" weight="medium" variant="lighter">
          Durasi <span className="hidden lg:inline">pengerjaan</span>:{' '}
          <TextSpan color="gray" variant="dark">
            ? menit
          </TextSpan>
        </Text>
      </div>
      <div className="flex flex-col justify-end flex-wrap gap-2 sm:flex-row">
        <Link
          href={`${routes.pengguna.bankSoal}/${idKategori}/soal/${idBankSoal}`}
          onClick={() => router.back()}
        >
          <Button as="span" size="sm" variant="outline" color="gray">
            <RiArrowLeftLine className="size-3 me-2" /> Kembali
          </Button>
        </Link>
        <Button
          size="sm"
          color="success"
          variant="outline"
          className="lg:hidden"
          onClick={() => setOpenSidebarMenu(true)}
        >
          Daftar Soal
        </Button>
      </div>
    </Card>
  )
}
