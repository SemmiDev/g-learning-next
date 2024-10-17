import { Card, Text, Title } from '@/components/ui'
import { useState } from 'react'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsMegaphone,
  BsWebcam,
} from 'react-icons/bs'
import ButtonIcon from '../button-icon'
import TambahInformasiModal from './modal/tambah-informasi'
import TambahKonferensiModal from './modal/tambah-konferensi'
import TambahMateriModal from './modal/tambah-materi'
import TambahTugasModal from './modal/tambah-tugas'
import TambahUjianModal from './modal/tambah-ujian'

type HeaderPengajarCardProps = {
  className?: string
}

export default function PengajarHeaderCard({
  className,
}: HeaderPengajarCardProps) {
  const [showTambahMateri, setShowTambahMateri] = useState(false)
  const [showTambahTugas, setShowTambahTugas] = useState(false)
  const [showTambahUjian, setShowTambahUjian] = useState(false)
  const [showTambahKonferensi, setShowTambahKonferensi] = useState(false)
  const [showTambahInformasi, setShowTambahInformasi] = useState(false)

  return (
    <>
      <Card className={className}>
        <Title as="h6" weight="semibold" className="leading-4">
          Mulai Diskusi
        </Title>
        <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
          Pilih jenis diskusi yang Kamu inginkan
        </Text>
        <div className="flex gap-5 mt-4">
          <ButtonIcon
            title="Materi"
            color="green"
            onClick={() => setShowTambahMateri(true)}
          >
            <BsFileRichtext size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Tugas"
            color="violet"
            onClick={() => setShowTambahTugas(true)}
          >
            <BsClipboardPlus size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Ujian"
            color="blue"
            onClick={() => setShowTambahUjian(true)}
          >
            <BsCardChecklist size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Konferensi"
            color="red"
            onClick={() => setShowTambahKonferensi(true)}
          >
            <BsWebcam size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Informasi"
            color="indigo"
            onClick={() => setShowTambahInformasi(true)}
          >
            <BsMegaphone size={32} />
          </ButtonIcon>
        </div>
      </Card>

      <TambahMateriModal
        show={showTambahMateri}
        setShow={setShowTambahMateri}
      />

      <TambahTugasModal show={showTambahTugas} setShow={setShowTambahTugas} />

      <TambahUjianModal show={showTambahUjian} setShow={setShowTambahUjian} />

      <TambahKonferensiModal
        show={showTambahKonferensi}
        setShow={setShowTambahKonferensi}
      />

      <TambahInformasiModal
        show={showTambahInformasi}
        setShow={setShowTambahInformasi}
      />
    </>
  )
}
