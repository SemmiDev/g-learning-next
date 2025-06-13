import {
  Button,
  Card,
  Modal,
  ModalFooterButtons,
  Select,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { deskripsiSemester } from '@/utils/semester'
import lmsBanner from '@public/images/banner/sinkron/lms.svg'
import smartBanner from '@public/images/banner/sinkron/smart.svg'
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
  const size = useAutoSizeMediumModal()
  const [semester, setSemester] = useState<string>()

  const handleClose = () => {
    setSemester(undefined)
    setShow(false)
  }

  return (
    <Modal
      title="Pilih Jenis Sinkronisasi Data"
      size={size}
      isOpen={show}
      onClose={handleClose}
      rounded="sm"
      bodyClassName="justify-between"
      overflow
    >
      <div className="flex flex-col gap-y-8 px-3 py-3 sm:gap-y-6">
        <Select
          label="Semester"
          placeholder="Pilih Semester"
          options={semesterOptions}
          onChange={(item) => {
            if (item?.value) setSemester(item?.value)
          }}
          required
        />
        <Card className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center gap-x-2">
            <Image
              src={lmsBanner}
              alt="LMS Smart Campus"
              className="min-w-28"
            />
            <BsArrowRight className="size-16 text-black" />
            <Image src={smartBanner} alt="Smart Campus" className="min-w-28" />
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
            <Image
              src={lmsBanner}
              alt="LMS Smart Campus"
              className="min-w-28"
            />
            <BsArrowLeft className="size-16 text-black" />
            <Image src={smartBanner} alt="Smart Campus" className="min-w-28" />
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
      </div>

      <ModalFooterButtons
        cancel="Tutup"
        onCancel={handleClose}
        className="sm:hidden"
        borderTop
      />
    </Modal>
  )
}
