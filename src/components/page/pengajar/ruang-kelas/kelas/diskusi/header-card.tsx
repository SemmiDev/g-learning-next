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

export default function HeaderCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <Title as="h6" weight="semibold" className="leading-4">
        Mulai Diskusi
      </Title>
      <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
        Pilih jenis diskusi yang Kamu inginkan
      </Text>
      <div className="flex space-x-4 mt-4">
        <ButtonIcon title="Materi" color="green">
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
  )
}
