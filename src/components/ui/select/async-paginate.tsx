'use client'

import { AnyObject } from '@/utils/type-interface'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate'
import { FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'
import { makeClassNames } from './style'

export type AsyncPaginateSelectActionProps<OptionType> = {
  search: string
  loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  page: number
}
export type AsyncPaginateSelectActionType<T extends AnyObject> = {
  list: T[]
  hasMore: boolean
}

export type AsyncPaginateSelectProps<
  OptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
  Additional = { page: number },
  TData extends AnyObject = AnyObject
> = Omit<
  AsyncPaginateProps<OptionType, Group, Additional, IsMulti>,
  'loadOptions'
> & {
  label?: string
  required?: boolean
  action(
    props: AsyncPaginateSelectActionProps<OptionType>
  ): Promise<AsyncPaginateSelectActionType<TData>>
  construct(data: TData): OptionType
  error?: string
  errorClassName?: string
}

export default function AsyncPaginateSelect<
  OptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
  TData extends AnyObject = AnyObject
>({
  label,
  required,
  action,
  construct,
  classNames,
  error,
  errorClassName,
  ...props
}: AsyncPaginateSelectProps<
  OptionType,
  IsMulti,
  Group,
  { page: number },
  TData
>) {
  return (
    <div className="react-select">
      {label && (
        <TextLabel className="mb-1.5">
          <Label label={label} required={required} />
        </TextLabel>
      )}
      <AsyncPaginate<OptionType, Group, { page: number }, IsMulti>
        unstyled={true}
        classNames={{
          ...makeClassNames(classNames, !!error),
          ...classNames,
        }}
        loadOptions={async (search, loadedOptions, { page } = { page: 1 }) => {
          const { list, hasMore } = await action({
            search,
            loadedOptions,
            page,
          })

          return {
            options: list.map((item) => construct(item)),
            hasMore: hasMore,
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
