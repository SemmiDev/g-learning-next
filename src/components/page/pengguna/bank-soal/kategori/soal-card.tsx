import { ActionIcon, Button, Text, Time, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { stripHtml } from '@/utils/text'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BiShareAlt } from 'react-icons/bi'
import {
  BsCardChecklist,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Dropdown } from 'rizzui'

export type SoalType = {
  id: string
  title: string
  desc: string
  time: string
  count: number
  total: number
}

type SoalCardProps = {
  soal: SoalType
  onShare?: (soal: SoalType) => void
  onEdit?: (soal: SoalType) => void
  onDelete?: (soal: SoalType) => void
  className?: string
}

export default function SoalCard({
  soal,
  onShare,
  onEdit,
  onDelete,
  className,
}: SoalCardProps) {
  const { kategori: idKategori }: { kategori: string } = useParams()
  const strippedDesc = stripHtml(soal.desc)

  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="flex size-12 items-center justify-center rounded-md btn-item-blue mr-2">
            <BsCardChecklist size={24} />
          </div>
          <Title
            as="h4"
            size="base"
            weight="semibold"
            variant="dark"
            className="flex-1 line-clamp-2"
            title={soal.title}
          >
            {soal.title}
          </Title>
        </div>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <ActionIcon as="span" size="sm" variant="outline-hover">
              <BsThreeDotsVertical size={14} />
            </ActionIcon>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-30 divide-y !py-0">
            <div className="py-2">
              <Dropdown.Item
                className="text-gray-dark"
                onClick={() => onEdit && onEdit(soal)}
              >
                <BsPencil className="text-orange size-4 mr-2" />
                Ubah
              </Dropdown.Item>
            </div>
            <div className="py-2">
              <Dropdown.Item
                className="text-gray-dark"
                onClick={() => onDelete && onDelete(soal)}
              >
                <BsTrash3 className="text-danger size-4 mr-2" />
                Hapus
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Text size="sm" weight="medium" variant="dark" className="line-clamp-2">
        {strippedDesc.slice(0, 100)}
        {strippedDesc.length > 100 && '...'}
      </Text>

      <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter mb-2">
        <li>
          <Time date={soal.time} format="datetime" />
        </li>
        <li>
          <GoDotFill size={10} />
        </li>
        <li
          title={
            soal.total < soal.count
              ? `Total soal (${soal.total}) masih kurang dari jumlah soal digunakan (${soal.count})`
              : ''
          }
        >
          {soal.count}/
          <span className={cn({ 'text-danger': soal.total < soal.count })}>
            {soal.total}
          </span>{' '}
          Soal
        </li>
      </ul>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onShare && onShare(soal)}
        >
          <BiShareAlt className="mr-2" />
          <Text size="xs" weight="medium" className="text-nowrap">
            Bagikan Soal
          </Text>
        </Button>
        <Link
          href={`${routes.pengguna.bankSoal}/${idKategori}/soal/${soal.id}`}
          className="flex-1"
        >
          <Button as="span" size="sm" variant="outline" className="w-full">
            <Text size="xs" weight="medium">
              Detail
            </Text>
          </Button>
        </Link>
      </div>
    </div>
  )
}
