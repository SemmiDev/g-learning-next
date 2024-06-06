'use client'

import { addSpacesToCamelCase } from '@/utils/add-spaces-to-camel-case'
import cn from '@/utils/class-names'
import emptyIcon from '@public/icons/empty.svg'
import Image from 'next/image'
import RcTable from 'rc-table'
import { PiTextColumns } from 'react-icons/pi'
import { ActionIcon, Checkbox, CheckboxGroup, Popover, Title } from 'rizzui'
import {
  TbCaretDownFilled,
  TbCaretUpDownFilled,
  TbCaretUpFilled,
} from 'react-icons/tb'
import Text, { TextProps } from './text/text'

export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T

const classes = {
  table:
    '[&_.rc-table-content]:overflow-x-auto [&_table]:w-full [&_.rc-table-row]:transition [&_.rc-table-row]:duration-50 [&_.rc-table-row:hover]:bg-gray-50 [&_.rc-table-row-expand-icon-cell]:w-14',
  thead:
    '[&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:text-sm [&_th.rc-table-cell]:font-semibold [&_th.rc-table-cell]:tracking-wider [&_th.rc-table-cell]:text-gray-500',
  tCell:
    '[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-4',
  variants: {
    classic:
      '[&_thead]:bg-gray-100 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead]:border-y [&_thead]:border-muted/70',
    modern:
      '[&_thead_th]:bg-gray-100 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    minimal:
      '[&_thead_th]:bg-gray-100 [&_thead_th:first-child]:rounded-ss-lg [&_thead_th:first-child]:rounded-es-lg [&_thead_th:last-child]:rounded-se-lg [&_thead_th:last-child]:rounded-ee-lg [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100',
    elegant:
      '[&_thead]:border-y [&_thead]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70',
    retro:
      '[&_thead]:border-y [&_thead]:border-muted/70 [&_tbody_tr:last-child_td.rc-table-cell]:border-b [&_tbody_tr:last-child_td.rc-table-cell]:border-muted/70',
  },
  striped:
    '[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-gray-100/50 [&_.rc-table-row:hover]:bg-transparent',
}

type RCTableProps = ExtractProps<typeof RcTable>

export interface TableProps
  extends Omit<RCTableProps, 'className' | 'emptyText'> {
  /** Set empty text, it will only appear when table has no data */
  emptyText?: React.ReactElement
  /** The variants of the component are: */
  variant?: keyof typeof classes.variants
  /** Add striping style */
  striped?: boolean
  /** Add custom classes for extra style */
  className?: string
}

/**
 *  React table component with useful functions. Under the hood we are using `rc-table` package,
 * you can check their official documentation for more details -> https://www.npmjs.com/package/rc-table
 */
export default function Table({
  striped,
  variant = 'classic',
  emptyText,
  className,
  ...props
}: TableProps) {
  return (
    <RcTable
      className={cn(
        classes.table,
        classes.thead,
        classes.tCell,
        classes.variants[variant],
        striped && classes.striped,
        className
      )}
      emptyText={
        emptyText || (
          <div className="flex flex-col items-center py-5 lg:py-8">
            <figure className="size-24">
              <Image src={emptyIcon} alt="Data Kosong" />
            </figure>
            <Text size="sm" weight="semibold" variant="dark" className="mt-4">
              Data Masih Kosong
            </Text>
          </div>
        )
      }
      {...props}
    />
  )
}

// Table Header Cell Component
type TextAlign = 'left' | 'center' | 'right'

export interface TableHeaderCellProps {
  title: React.ReactNode
  width?: number
  /** Set table header cell text alignment */
  align?: TextAlign
  /** Make header cell text ellipsis, you need to set width prop too */
  ellipsis?: boolean
  /** Make sortable column, it's also required ascending prop too. Check our example for more details. */
  sortable?: boolean
  /** Make ascending or descending column, it's also required sortable prop too. Check our example for more details. */
  sort?: 'asc' | 'desc'
  /** Add custom classes to the sort icon for extra style */
  iconClassName?: string
  /** Add custom classes for extra style */
  className?: string
}

// A util func
function handleTextAlignment(align: TextAlign) {
  if (align === 'center') return 'justify-center'
  if (align === 'right') return 'justify-end'
  return ''
}

export function TableHeaderCell({
  title,
  align = 'left',
  width,
  ellipsis,
  sortable,
  sort,
  iconClassName,
  className,
}: TableHeaderCellProps) {
  if (ellipsis && width === undefined) {
    console.warn(
      'When ellipsis is true make sure you are using the same column width in TableHeaderCell component too.'
    )
  }
  if (width !== undefined && ellipsis !== true) {
    console.warn(
      "width prop without ellipsis won't work, please set ellipsis prop true."
    )
  }
  return (
    <div
      className={cn(
        'flex items-center gap-1 text-gray-dark font-bold',
        sortable && 'cursor-pointer',
        handleTextAlignment(align),
        className
      )}
    >
      <div
        {...(ellipsis && { className: 'truncate' })}
        {...(ellipsis && width && { style: { width } })}
      >
        {title}
      </div>
      {sortable && (
        <div className="inline-flex">
          {sort === 'asc' ? (
            <TbCaretDownFilled className={cn(iconClassName)} />
          ) : sort === 'desc' ? (
            <TbCaretUpFilled className={cn(iconClassName)} />
          ) : (
            <TbCaretUpDownFilled className={cn(iconClassName)} />
          )}
        </div>
      )}
    </div>
  )
}

export const TableCellText = ({
  size = 'sm',
  variant = 'dark',
  ...props
}: TextProps) => <Text size={size} variant={variant} {...props} />

export const TableCellNumber = ({
  size = 'xs',
  weight = 'semibold',
  align = 'center',
  ...props
}: TextProps) => (
  <TableCellText size={size} weight={weight} align={align} {...props} />
)

export const renderTableCellText = (value: any) => (
  <TableCellText>{value}</TableCellText>
)

export const renderTableCellNumber = (_: any, __: any, idx: any) => (
  <TableCellNumber>{idx + 1}</TableCellNumber>
)

type ToggleColumnsTypes<T> = {
  columns: T[]
  checkedColumns: string[]
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>
  hideIndex?: number
}

export function TableToggleColumns<T>({
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
}: ToggleColumnsTypes<T>) {
  return (
    <div>
      <Popover shadow="sm" placement="bottom-end">
        <Popover.Trigger>
          <ActionIcon variant="outline" title={'Toggle Columns'}>
            <PiTextColumns strokeWidth={3} className=" h-6 w-6" />
          </ActionIcon>
        </Popover.Trigger>
        <Popover.Content className="z-0">
          <div className="px-0.5 pt-2 text-left rtl:text-right">
            <Title as="h6" className="mb-1 px-0.5 text-sm font-semibold">
              Toggle Columns
            </Title>
            <CheckboxGroup
              values={checkedColumns}
              setValues={setCheckedColumns}
              className="grid grid-cols-2 gap-x-6 gap-y-5 px-1.5 pb-3.5 pt-4"
            >
              {columns.map((column: any, index) => (
                <Checkbox
                  key={column.dataIndex}
                  value={column.dataIndex}
                  label={addSpacesToCamelCase(column.dataIndex)}
                  labelClassName="ml-2 rtl:mr-2 text-[13px] font-medium"
                  className={cn(
                    hideIndex && index === hideIndex ? 'hidden' : ''
                  )}
                />
              ))}
            </CheckboxGroup>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
}
