import { Komentar } from '@/components/ui'
import { notFound } from 'next/navigation'

export default function Tes5Page() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <div className="w-1/2 mt-8">
      <div className="border border-muted p-4">
        <Komentar
          idKelas="01J8KHTCDEHV9MVGXS8DWQGWD5"
          idAktifitas="01J9JA24E3JQVVXETP9G78W34E"
          showPer={3}
        />
      </div>
    </div>
  )
}
