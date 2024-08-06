import {
  Button,
  CardSeparator,
  Modal,
  ModalConfirm,
  ModalFooterButtons,
  ReadMore,
  Text,
  Title,
} from '@/components/ui'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'

type DataType = {
  nama: string
  level: string
  deskripsi: string
  username: string
  kontak?: string
  email?: string
  website?: string
  jenisKelamin?: string
  alasanBlokir: string
}

type LihatModalProps = {
  showModal?: number
  setShowModal(show?: number): void
}

export default function LihatDiblokirModal({
  showModal,
  setShowModal,
}: LihatModalProps) {
  const [data, setData] = useState<DataType>()
  const [showBukaBlokir, setShowBukaBlokir] = useState(false)

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
      alasanBlokir:
        'Akun dicuri dan digunakan oleh pihak lain, ini merupakan contoh alasan blokir',
    })
  }, [showModal])

  return (
    <Modal
      title="Detail Pengguna yang Diblokir"
      size="md"
      isOpen={!!showModal}
      onClose={() => setShowModal(undefined)}
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
          <DataRow label="Alasan Diblokir">{data?.alasanBlokir || '-'}</DataRow>
        </tbody>
      </table>

      <CardSeparator />

      <ModalFooterButtons
        cancel="Tutup"
        onCancel={() => setShowModal(undefined)}
      >
        <div className="flex-1">
          <Button className="w-full" onClick={() => setShowBukaBlokir(true)}>
            Buka Blokir
          </Button>
        </div>
      </ModalFooterButtons>

      <ModalConfirm
        title="Buka Blokir"
        desc="Yakin ingin membuka blokir pengguna ini di instansi anda?"
        confirmColor="primary"
        isOpen={showBukaBlokir}
        onConfirm={() => setShowBukaBlokir(false)}
        onClose={() => setShowBukaBlokir(false)}
        closeOnCancel
      />
    </Modal>
  )
}

function DataRow({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <tr>
      <td className="w-32 font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className="font-semibold text-gray-dark py-2">{children}</td>
    </tr>
  )
}
