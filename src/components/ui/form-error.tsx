import { Alert } from 'rizzui'
import Text from './text/text'

export type FormErrorProps = {
  error: string | undefined
  onClose?: () => void
}

export default function FormError({ error, onClose }: FormErrorProps) {
  return (
    error && (
      <Alert
        size="sm"
        variant="flat"
        color="danger"
        onClose={onClose}
        closable={!!onClose}
      >
        <Text size="sm" weight="medium">
          {error}
        </Text>
      </Alert>
    )
  )
}
