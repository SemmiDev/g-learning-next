'use client'

import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'

export default function DiskusiLainnyaBody() {
  const router = useRouter()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas}/${idKelas}`}
          onClick={() => router.back()}
        >
          <Button
            as="span"
            variant="text"
            color="primary"
            className="text-gray-dark"
          >
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-y-8 gap-x-4">
        <DetailCard className="w-full lg:w-8/12" />
      </div>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}
