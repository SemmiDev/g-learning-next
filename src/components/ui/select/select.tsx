'use client'

import { AnyObject } from '@/utils/type-interface'
import { useId } from 'react'
import ReactSelect, { GroupBase, Props as ReactSelectProps } from 'react-select'
import { FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'
import { ClassNamesType, makeClassNames } from './style'

export type SelectOptionType<T = string> = {
  label: string
  value: T
} & AnyObject

export type SelectProps<
  TOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>
> = Omit<ReactSelectProps<TOption, IsMulti, Group>, 'classNames'> & {
  label?: string
  required?: boolean
  error?: string
  errorClassName?: string
  classNames?: ClassNamesType
}

export default function Select<
  TOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<TOption> = GroupBase<TOption>
>({
  label,
  required,
  classNames,
  error,
  errorClassName,
  ...props
}: SelectProps<TOption, IsMulti, Group>) {
  return (
    <div className="react-select">
      {label && (
        <TextLabel className="mb-1.5">
          <Label label={label} required={required} />
        </TextLabel>
      )}
      <ReactSelect<TOption, IsMulti, Group>
        unstyled={true}
        classNames={makeClassNames(classNames, !!error)}
        instanceId={useId()}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
