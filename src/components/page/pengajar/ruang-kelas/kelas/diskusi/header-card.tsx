import Card from '@/components/ui/card'
import ButtonIcon from '../button-icon'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsMegaphone,
  BsWebcam,
} from 'react-icons/bs'
import {
  Button,
  CardSeparator,
  Input,
  Modal,
  Text,
  Title,
} from '@/components/ui'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import QuillEditor from '@/components/ui/quill-editor'
import TambahMateriModal from './modal/tambah-materi'

export default function HeaderCard({ className }: { className?: string }) {
  const [showModalMateri, setShowModalMateri] = useState(false)

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
          <ButtonIcon title="Tugas" color="violet">
            <BsClipboardPlus size={26} />
          </ButtonIcon>
          <ButtonIcon title="Ujian" color="blue">
            <BsCardChecklist size={26} />
          </ButtonIcon>
          <ButtonIcon title="Konferens" color="red">
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
    </>
  )
}
