import { Card, Title } from '@/components/ui'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsMegaphone,
  BsWebcam,
} from 'react-icons/bs'
import ButtonIcon from './button-icon'

export default function HeaderCard({ className }: { className?: string }) {
  return (
    <>
      <Card className={className}>
        <Title as="h6" weight="semibold" className="leading-4">
          Bagikan sesuatu
        </Title>
        <div className="flex gap-5 mt-4">
          <ButtonIcon title="Materi" color="green">
            <BsFileRichtext size={32} />
          </ButtonIcon>
          <ButtonIcon title="Tugas" color="violet">
            <BsClipboardPlus size={32} />
          </ButtonIcon>
          <ButtonIcon title="Ujian" color="blue">
            <BsCardChecklist size={32} />
          </ButtonIcon>
          <ButtonIcon title="Conference" color="red">
            <BsWebcam size={32} />
          </ButtonIcon>
          <ButtonIcon title="Informasi" color="indigo">
            <BsMegaphone size={32} />
          </ButtonIcon>
        </div>
      </Card>
    </>
  )
}
