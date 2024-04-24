import Card from '@/components/ui/card'
import ButtonIcon from '../button-icon'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsMegaphone,
  BsWebcam,
} from 'react-icons/bs'
import { Text, Title } from '@/components/ui'
import { useState } from 'react'
import TambahMateriModal from './modal/tambah-materi'
import TambahUjianModal from './modal/tambah-ujian'
import TambahTugasModal from './modal/tambah-tugas'
import TambahConferenceModal from './modal/tambah-conference'

export default function HeaderCard({ className }: { className?: string }) {
  const [showModalMateri, setShowModalMateri] = useState(false)
  const [showModalTugas, setShowModalTugas] = useState(false)
  const [showModalUjian, setShowModalUjian] = useState(false)
  const [showModalConference, setShowModalConference] = useState(false)

  return (
    <>
      <Card className={className}>
        <Title as="h6" weight="semibold" className="leading-4">
          Mulai Diskusi
        </Title>
        <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
          Pilih jenis diskusi yang Kamu inginkan
        </Text>
        <div className="flex space-x-4 mt-4">
          <ButtonIcon
            title="Materi"
            color="green"
            onClick={() => setShowModalMateri(true)}
          >
            <BsFileRichtext size={26} />
          </ButtonIcon>
          <ButtonIcon
            title="Tugas"
            color="violet"
            onClick={() => setShowModalTugas(true)}
          >
            <BsClipboardPlus size={26} />
          </ButtonIcon>
          <ButtonIcon
            title="Ujian"
            color="blue"
            onClick={() => setShowModalUjian(true)}
          >
            <BsCardChecklist size={26} />
          </ButtonIcon>
          <ButtonIcon
            title="Conference"
            color="red"
            onClick={() => setShowModalConference(true)}
          >
            <BsWebcam size={26} />
          </ButtonIcon>
          <ButtonIcon title="Informasi" color="indigo">
            <BsMegaphone size={26} />
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
    </>
  )
}
