import {
  Button,
  Card,
  Modal,
  Select,
  SelectOptionType,
  Text,
  TextSpan,
} from '@/components/ui'
import { deskripsiSemester } from '@/utils/semester'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const currentYear = new Date().getFullYear()
const semesterOptions: SelectOptionType<string>[] = [...Array(20)].map(
  (_, idx) => {
    const semester = `${currentYear - Math.floor(idx / 2)}${
      (idx % 2) % 2 == 0 ? 2 : 1
    }`

    return {
      value: semester,
      label: deskripsiSemester(semester),
    }
  }
)

type SyncOptionModalProps = {
  logo: string | StaticImport
  labelTop: string
  labelBottom: string
  bgColor: string
  show: boolean
  setShow(show: boolean): void
  onSyncPush(semester: string): void
  onSyncPull(semester: string): void
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
  const [semester, setSemester] = useState<string>()

  const handleClose = () => {
    setSemester(undefined)
    setShow(false)
  }

  return (
    <Modal
      title="Pilih Jenis Sinkronisasi Data"
      isOpen={show}
      onClose={handleClose}
      rounded="sm"
      bodyClassName="flex flex-col gap-y-4 px-3 py-3"
      overflow
    >
      <Select
        label="Semester"
        placeholder="Pilih Semester"
        options={semesterOptions}
        onChange={(item) => {
          if (item?.value) setSemester(item?.value)
        }}
        className="flex-1"
        required
      />
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
          disabled={!semester}
          onClick={() => {
            onSyncPush(semester || '')
            // handleClose()
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
          disabled={!semester}
          onClick={() => {
            onSyncPull(semester || '')
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
