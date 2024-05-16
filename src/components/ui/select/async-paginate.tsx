'use client'

import { Without } from '@/utils/without-type'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate'
import { FieldError } from 'rizzui'
import TextLabel from '../text/label'
import { defaultClassNames } from './style'

export type AsyncPaginateSelectActionProps = {
  search: string
  loadedOptions: OptionsOrGroups<any, GroupBase<any>>
  page: number
}

export type AsyncPaginateSelectProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = Without<
  AsyncPaginateProps<OptionType, Group, Additional, IsMulti>,
  'loadOptions'
> & {
  label?: string
  action({
    search,
    loadedOptions,
    page,
  }: {
    search: string
    loadedOptions: OptionsOrGroups<OptionType, Group>
    page: number
  }): Promise<any[]>
  construct(data: any): OptionType
  error?: string
  errorClassName?: string
}

export default function AsyncPaginateSelect<
  OptionType,
  Group extends GroupBase<OptionType>,
  IsMulti extends boolean
>({
  label,
  action,
  construct,
  classNames,
  error,
  errorClassName,
  ...props
}: AsyncPaginateSelectProps<OptionType, Group, { page: number }, IsMulti>) {
  return (
    <div className="react-select">
      {label && <TextLabel className="mb-1.5">{label}</TextLabel>}
      <AsyncPaginate<OptionType, Group, { page: number }, IsMulti>
        unstyled={true}
        classNames={{
          ...defaultClassNames(!!error),
          ...classNames,
        }}
        loadOptions={async (search, loadedOptions, { page } = { page: 1 }) => {
          const data = await action({ search, loadedOptions, page })

          return {
            options: data.map((item) => construct(item)),
            hasMore: page < 10,
            additional: {
              page: page + 1,
            },
          }
        }}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
