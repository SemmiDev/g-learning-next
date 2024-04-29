import { useState } from 'react'
import ModalConfirm from '../modal/confirm'
import { ModalSize } from 'rizzui'
import Button, { ButtonProps } from '../button'
import { Without } from '@/utils/without-type'

type ConfirmButtonProps = Without<ButtonProps, 'title'> & {
  title: string
  desc?: string
  confirm?: string
  comfirmSize?: ModalSize
  onConfirm?(): void
  cancel?: string
  onCancel?(): void
  closeOnCancel?: boolean
}

export default function ConfirmButton({
  title,
  desc = 'Anda yakin?',
  confirm = 'Ya',
  comfirmSize = 'sm',
  onConfirm,
  cancel = 'Tidak',
  onCancel,
  closeOnCancel = true,
  children,
  ...props
}: ConfirmButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)} {...props}>
        {children}
      </Button>
      <ModalConfirm
        title={title}
        desc={desc}
        size={comfirmSize}
        isOpen={showModal}
        confirm={confirm}
        onConfirm={onConfirm}
        cancel={cancel}
        onCancel={() => {
          closeOnCancel && setShowModal(false)
          onCancel && onCancel()
        }}
        onClose={() => {
          setShowModal(false)
        }}
      />
    </>
  )
}
