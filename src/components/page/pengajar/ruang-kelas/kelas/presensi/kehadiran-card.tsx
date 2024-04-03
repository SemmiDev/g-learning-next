import { Text, Title } from '@/components/ui'
import Card from '@/components/ui/card'
import Pagination from '@/components/ui/pagination'
import Table from '@/components/ui/table'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'

export default function KehadiranPresensiCard({
  columns,
  data,
}: {
  columns: ColumnsType<DefaultRecordType>
  data: DefaultRecordType[]
}) {
  return (
    <Card className="col-span-3 p-0 lg:col-span-2">
      <Title as="h4" weight="semibold" className="text-[1.375rem] m-2">
        Anggota Kelas dengan Jumlah Kehadiran Terendah
      </Title>
      <div className="relative">
        <Table
          rowKey={(record) => record.id}
          variant="elegant"
          columns={columns}
          data={data}
        />
      </div>
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 10 dari 30 data
        </Text>
        <Pagination total={30} />
      </div>
    </Card>
  )
}
