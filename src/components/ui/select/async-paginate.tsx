'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { AnyObject } from '@/utils/type-interface'
import { ReactNode, useId } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate'
import { FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'
import { SelectOptionType } from './select'
import { makeClassNames } from './style'

export type AsyncPaginateSelectActionProps<
  TOption extends SelectOptionType = SelectOptionType
> = {
  jwt: string
  search: string
  loadedOptions: OptionsOrGroups<TOption, GroupBase<TOption>>
  page: number
}

export type AsyncPaginateSelectActionType<T extends AnyObject = AnyObject> = {
  list: T[]
  hasMore: boolean
}

export type AdditionalData = { page: number } & AnyObject

export type AsyncPaginateSelectProps<
  TOption extends SelectOptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>,
  TData extends AnyObject = AnyObject,
  Additional extends AdditionalData = AdditionalData
> = Omit<
  AsyncPaginateProps<TOption, Group, Additional, IsMulti>,
  'loadOptions'
> & {
  label?: ReactNode
  required?: boolean
  action: (
    props: AsyncPaginateSelectActionProps<TOption>
  ) => Promise<AsyncPaginateSelectActionType<TData>>
  construct: (data: TData) => TOption
  error?: string
  errorClassName?: string
}

export default function AsyncPaginateSelect<
  TOption extends SelectOptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<TOption> = GroupBase<TOption>,
  TData extends AnyObject = AnyObject,
  Additional extends AdditionalData = AdditionalData
>({
  label,
  required,
  action,
  construct,
  classNames,
  error,
  errorClassName,
  ...props
}: AsyncPaginateSelectProps<TOption, IsMulti, Group, TData, Additional>) {
  const { jwt } = useSessionJwt()

  return (
    <div className="react-select">
      {label && (
        <TextLabel className="mb-1.5">
          <Label label={label} required={required} />
        </TextLabel>
      )}
      <AsyncPaginate<TOption, Group, Additional, IsMulti>
        instanceId={useId()}
        unstyled={true}
        classNames={{
          ...makeClassNames(classNames, !!error),
          ...classNames,
        }}
        loadOptions={async (search, loadedOptions, additional) => {
          const { page } = additional ?? { page: 1 }
          const { list, hasMore } = await action({
            jwt,
            search,
            loadedOptions,
            page,
          })

          return {
            options: list.map((item) => construct(item)),
            hasMore: hasMore,
            additional: {
              page: page + 1,
            } as Additional,
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
