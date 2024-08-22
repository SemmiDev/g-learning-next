import { PiCaretDownBold } from 'react-icons/pi'
import Pagination, { type PaginationProps } from '@/components/ui/pagination'
import { Select } from 'rizzui'
import cn from '@/utils/class-names'
import Text from '../text/text'

const paginationLimitOptions = [5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}))

export type TablePaginationProps = {
  pageSize: number
  setPageSize?: React.Dispatch<React.SetStateAction<number>>
  paginatorClassName?: string
} & PaginationProps

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName,
  ...props
}: TablePaginationProps) {
  return (
    <div
      className={cn(
        'table-pagination flex items-center justify-center px-2.5 py-4 sm:justify-between',
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total !== undefined && (
          <div className="hidden sm:inline-flex">
            <Text size="2xs" variant="lighter">
              Menampilkan {props.current} dari {Math.ceil(total / pageSize)}{' '}
              halaman
            </Text>
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex">
          <Text size="xs" variant="lighter">
            Data per halaman:
          </Text>
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            className="ms-1 w-auto [&_button]:font-medium"
            optionClassName="px-1"
          />
        </div>
      )}

      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        className="select-none"
        prevIconClassName="py-0 text-gray !leading-[26px]"
        nextIconClassName="py-0 text-gray !leading-[26px]"
        {...props}
      />
    </div>
  )
}
