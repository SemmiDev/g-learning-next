import { Card, CardSeparator, Text } from '@/components/ui'

export default function SisaWaktuCard() {
  return (
    <Card className="flex flex-col p-0">
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        Sisa waktu pengerjaan
      </Text>
      <CardSeparator />
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        00:43:59
      </Text>
    </Card>
  )
}
