import { useModal } from '@/components/shared/global-modal/use-modal'
import { Without } from '@/utils/without-type'
import { ModalSize } from 'rizzui'
import Button, { ButtonProps } from '../../../ui/button/button'
import CardSeparator from '../../../ui/card-separator'
import ModalFooterButtons from '../../../ui/modal/footer-buttons'
import ModalHeader from '../../../ui/modal/header'
import Text from '../../../ui/text/text'

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
  const { openModal, closeModal } = useModal()

  return (
    <>
      <Button
        onClick={() =>
          openModal({
            size: 'sm',
            view: (
              <>
                <ModalHeader
                  title={title}
                  onClose={closeModal}
                  className="[&_.modal-title]:text-lg"
                />
                <Text
                  weight="semibold"
                  variant="dark"
                  className="text-center p-3"
                >
                  {desc}
                </Text>

                <CardSeparator />

                <ModalFooterButtons
                  buttons={
                    <Button
                      variant="solid"
                      className="flex-1"
                      color="danger"
                      onClick={onConfirm}
                    >
                      {confirm}
                    </Button>
                  }
                  cancel={cancel}
                  onCancel={() => {
                    closeOnCancel && closeModal()
                    onCancel && onCancel()
                  }}
                />
              </>
            ),
          })
        }
        {...props}
      >
        {children}
      </Button>
    </>
  )
}
