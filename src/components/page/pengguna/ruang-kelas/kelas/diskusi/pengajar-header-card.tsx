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
import TambahConferenceModal from './modal/tambah-conference'
import TambahInformasiModal from './modal/tambah-informasi'
import TambahMateriModal from './modal/tambah-materi'
import TambahTugasModal from './modal/tambah-tugas'
import TambahUjianModal from './modal/tambah-ujian'

type HeaderPengajarCardProps = {
  className?: string
}

export default function PengajarHeaderCard({
  className,
}: HeaderPengajarCardProps) {
  const [showModalMateri, setShowModalMateri] = useState(false)
  const [showModalTugas, setShowModalTugas] = useState(false)
  const [showModalUjian, setShowModalUjian] = useState(false)
  const [showModalConference, setShowModalConference] = useState(false)
  const [showModalInformasi, setShowModalInformasi] = useState(false)

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
            onClick={() => setShowModalMateri(true)}
          >
            <BsFileRichtext size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Tugas"
            color="violet"
            onClick={() => setShowModalTugas(true)}
          >
            <BsClipboardPlus size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Ujian"
            color="blue"
            onClick={() => setShowModalUjian(true)}
          >
            <BsCardChecklist size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Conference"
            color="red"
            onClick={() => setShowModalConference(true)}
          >
            <BsWebcam size={32} />
          </ButtonIcon>
          <ButtonIcon
            title="Informasi"
            color="indigo"
            onClick={() => setShowModalInformasi(true)}
          >
            <BsMegaphone size={32} />
          </ButtonIcon>
        </div>
      </Card>

      <TambahMateriModal
        showModal={showModalMateri}
        setShowModal={setShowModalMateri}
      />

      <TambahTugasModal
        showModal={showModalTugas}
        setShowModal={setShowModalTugas}
      />

      <TambahUjianModal
        showModal={showModalUjian}
        setShowModal={setShowModalUjian}
      />

      <TambahConferenceModal
        showModal={showModalConference}
        setShowModal={setShowModalConference}
      />

      <TambahInformasiModal
        showModal={showModalInformasi}
        setShowModal={setShowModalInformasi}
      />
    </>
  )
}
