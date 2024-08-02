import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  ReadMore,
  Text,
  Title,
} from '@/components/ui'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import BlokirModal from './blokir'

type DataType = {
  nama: string
  level: string
  deskripsi: string
  username: string
  kontak?: string
  email?: string
  website?: string
  jenisKelamin?: string
}

type LihatModalProps = {
  showModal?: number | null
  setShowModal(show: number | null): void
}

export default function LihatModal({
  showModal = null,
  setShowModal,
}: LihatModalProps) {
  const [data, setData] = useState<DataType | null>()
  const [showBlokir, setShowBlokir] = useState(false)

  useEffect(() => {
    setData({
      nama: 'Annitsa Bestweden',
      level: 'Pengajar',
      deskripsi:
        'Seorang dosen senior di Fakultas Ekonomi dengan keahlian di bidang Ekonomi Makro, Kebijakan Publik, dan Pembangunan Ekonomi. Saya telah menempuh pendidikan di Universitas Harvard, Universitas Indonesia, dan Universitas Gadjah Mada. Dengan lebih dari 12 tahun pengalaman mengajar dan meneliti, saya berkomitmen untuk memberikan pendidikan berkualitas dan berkontribusi dalam penelitian yang bermanfaat bagi masyarakat. Saya aktif menerbitkan artikel ilmiah dan terlibat dalam proyek penelitian kolaboratif',
      username: 'anbes',
      kontak: '0812 3456 7890',
      email: 'halo@anbes.com',
      website: 'anbes.com',
      jenisKelamin: 'Perempuan',
    })
  }, [showModal])

  return (
    <Modal
      title="Detail Pengguna"
      size="sm"
      isOpen={!!showModal}
      onClose={() => setShowModal(null)}
    >
      <div className="flex flex-col items-center p-3">
        <figure className="shrink-0 size-[150px] border border-muted rounded mb-2">
          <Image
            src={imagePhoto}
            alt="foto profil"
            className="object-contain"
          />
        </figure>
        <Title size="1.5xl" weight="semibold">
          {data?.nama}
        </Title>
        <Text size="sm" weight="semibold" variant="dark" className="mb-2">
          {data?.level || '-'}
        </Text>
        <Text size="sm" weight="medium" variant="dark" align="center">
          <ReadMore truncate={115}>{data?.deskripsi || '-'}</ReadMore>
        </Text>
      </div>

      <CardSeparator />

      <table className="mx-3">
        <tbody>
          <DataRow label="Username">{data?.username}</DataRow>
          <DataRow label="Kontak">{data?.kontak || '-'}</DataRow>
          <DataRow label="Email">{data?.email || '-'}</DataRow>
          <DataRow label="Website">{data?.website || '-'}</DataRow>
          <DataRow label="Jenis Kelamin">{data?.jenisKelamin || '-'}</DataRow>
        </tbody>
      </table>

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setShowModal(null)}>
        <div className="flex-1">
          <Button
            variant="flat-colorful"
            color="danger"
            className="w-full"
            onClick={() => setShowBlokir(true)}
          >
            Blokir
          </Button>
        </div>
      </ModalFooterButtons>

      <BlokirModal showModal={showBlokir} setShowModal={setShowBlokir} />
    </Modal>
  )
}

function DataRow({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <tr>
      <td className="font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className="font-semibold text-gray-dark py-2">{children}</td>
    </tr>
  )
}
