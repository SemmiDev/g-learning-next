import { Button, Card, Modal, Text, TextSpan } from '@/components/ui'
import cn from '@/utils/class-names'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

type SyncOptionModalProps = {
  logo: string | StaticImport
  labelTop: string
  labelBottom: string
  bgColor: string
  show: boolean
  setShow(show: boolean): void
  onSyncPush(): void
  onSyncPull(): void
}

export default function SyncOptionModal({
  logo,
  labelTop,
  labelBottom,
  bgColor,
  show,
  setShow,
  onSyncPush,
  onSyncPull,
}: SyncOptionModalProps) {
  const handleClose = () => {
    setShow(false)
  }

  return (
    <Modal
      title="Pilih Jenis Sinkronisasi Data"
      isOpen={show}
      onClose={handleClose}
      rounded="sm"
      bodyClassName="flex flex-col gap-y-4 px-3 py-3"
    >
      <Card className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center gap-x-2">
          <MainBanner />
          <BsArrowRight className="size-16 text-black" />
          <OptionBanner
            logo={logo}
            labelTop={labelTop}
            labelBottom={labelBottom}
            bgColor={bgColor}
          />
        </div>
        <Button
          variant="outline"
          className="text-primary"
          onClick={() => {
            onSyncPush()
            handleClose()
          }}
        >
          Sinkron Data ke {labelTop} {labelBottom}
        </Button>
      </Card>
      <Card className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center gap-x-2">
          <MainBanner />
          <BsArrowLeft className="size-16 text-black" />
          <OptionBanner
            logo={logo}
            labelTop={labelTop}
            labelBottom={labelBottom}
            bgColor={bgColor}
          />
        </div>
        <Button
          variant="outline"
          className="text-primary"
          onClick={() => {
            onSyncPull()
            handleClose()
          }}
        >
          Sinkron Data dari {labelTop} {labelBottom}
        </Button>
      </Card>
    </Modal>
  )
}

function MainBanner() {
  return (
    <div className="flex justify-center items-center w-44 h-16 rounded-md bg-black">
      <Text size="lg" weight="extrabold" className="text-[#D40000]">
        G-Learning
      </Text>
    </div>
  )
}

function OptionBanner({
  logo,
  labelTop,
  labelBottom,
  bgColor,
}: {
  logo: string | StaticImport
  labelTop: string
  labelBottom: string
  bgColor: string
}) {
  return (
    <div
      className="flex justify-center items-center gap-x-1 w-44 h-16 rounded-md"
      style={{ backgroundColor: bgColor }}
    >
      <Image src={logo} alt="sinkron" className="h-12 w-auto" />
      <div className="flex flex-col text-xl leading-5">
        <TextSpan weight="extrabold" className="text-white">
          {labelTop}
        </TextSpan>
        <TextSpan weight="extrabold" className="text-white">
          {labelBottom}
        </TextSpan>
      </div>
    </div>
  )
}
