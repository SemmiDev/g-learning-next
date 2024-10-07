import { Card, Title } from '@/components/ui'
import { useState } from 'react'
import { BsMegaphone } from 'react-icons/bs'
import ButtonIcon from '../button-icon'

type PesertaHeaderCardProps = {
  className?: string
}

export default function PesertaHeaderCard({
  className,
}: PesertaHeaderCardProps) {
  const [showTambahDiskusi, setShowTambahDiskusi] = useState(false)

  return (
    <>
      <Card className={className}>
        <Title as="h6" weight="semibold" className="leading-4">
          Bagikan sesuatu di kelas
        </Title>
        <div className="flex gap-5 mt-4">
          <ButtonIcon
            title="Diskusi"
            color="indigo"
            // onClick={() => setShowModalDiskusi(true)}
          >
            <BsMegaphone size={32} />
          </ButtonIcon>
        </div>
      </Card>
    </>
  )
}
