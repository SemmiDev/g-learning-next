'use client'

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
export type AsyncPaginateSelectActionType = { data: any[]; hasMore: boolean }

export type AsyncPaginateSelectProps<
  OptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
  Additional = { page: number }
> = Omit<
  AsyncPaginateProps<OptionType, Group, Additional, IsMulti>,
  'loadOptions'
> & {
  label?: string
  required?: boolean
  action(
    props: AsyncPaginateSelectActionProps<OptionType>
  ): Promise<AsyncPaginateSelectActionType>
  construct(data: any): OptionType
  error?: string
  errorClassName?: string
}

export default function AsyncPaginateSelect<
  OptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  label,
  required,
  action,
  construct,
  classNames,
  error,
  errorClassName,
  ...props
}: AsyncPaginateSelectProps<OptionType, IsMulti, Group>) {
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
          const { data, hasMore } = await action({
            search,
            loadedOptions,
            page,
          })

          return {
            options: data.map((item) => construct(item)),
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
