'use client'

import { useId } from 'react'
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate'
import TextLabel from '../text/label'
import { defaultClassNames } from './style'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { Without } from '@/utils/without-type'
import { wait } from '@/utils/wait'

export type OptionType = {
  value: number
  label: string
}

export type SelectProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = Without<
  AsyncPaginateProps<OptionType, Group, Additional, IsMulti>,
  'loadOptions'
> & {
  label?: string
}

const options: OptionType[] = []
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  })
}

export default function AsyncPaginateSelect({
  label,
  classNames,
  ...props
}: SelectProps<unknown, GroupBase<OptionType>, unknown, boolean>) {
  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) => {
    await wait(1000)

    let filteredOptions: OptionType[]
    if (!search) {
      filteredOptions = options
    } else {
      const searchLower = search.toLowerCase()

      filteredOptions = options.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
      )
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 10
    )

    return {
      options: slicedOptions,
      hasMore,
    }
  }

  return (
    <div className="react-select">
      {label && <TextLabel className="mb-1">{label}</TextLabel>}
      {/* <AsyncPaginate
        unstyled={true}
        classNames={{
          ...defaultClassNames,
          ...classNames,
        }}
        loadOptions={loadOptions}
        {...props}
      /> */}
    </div>
  )
}
