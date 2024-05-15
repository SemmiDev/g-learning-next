'use client'

import { useId } from 'react'
import {
  AsyncPaginate,
  AsyncPaginateProps,
  WithAsyncPaginateType,
} from 'react-select-async-paginate'
import TextLabel from '../text/label'
import { defaultClassNames } from './style'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { Without } from '@/utils/without-type'
import { wait } from '@/utils/wait'

export type SelectProps<OT, Group, Additional, IsMulti> = AsyncPaginateProps<
  OT,
  GroupBase<OT>,
  Additional,
  boolean
> & {
  label?: string
}

export default function AsyncPaginateSelect<
  OT,
  Group extends GroupBase<OT>,
  Additional,
  IsMulti extends boolean = false
>({
  label,
  classNames,
  ...props
}: SelectProps<OT, GroupBase<OT>, Additional, boolean>) {
  return (
    <div className="react-select">
      {label && <TextLabel className="mb-1">{label}</TextLabel>}
      <AsyncPaginate
        unstyled={true}
        classNames={{
          ...defaultClassNames,
          ...classNames,
        }}
        {...props}
      />
    </div>
  )
}
