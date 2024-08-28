import { Alert } from 'rizzui'
import Text from './text/text'

export type FormErrorProps = {
  error: string | undefined
}

export default function FormError({ error }: FormErrorProps) {
  return (
    error && (
      <Alert size="sm" variant="flat" color="danger">
        <Text size="sm" weight="medium">
          {error}
        </Text>
      </Alert>
    )
  )
}
