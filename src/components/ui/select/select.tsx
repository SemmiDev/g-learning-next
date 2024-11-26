'use client'

import cn from '@/utils/class-names'
import { AnyObject } from '@/utils/type-interface'
import { ReactNode, useId } from 'react'
import ReactSelect, { GroupBase, Props as ReactSelectProps } from 'react-select'
import { FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'
import { ClassNamesType, makeClassNames } from './style'

export type SelectOptionType<T extends string | number = string> = {
  label: string
  value: T
} & AnyObject

export type SelectProps<
  TOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>
> = Omit<ReactSelectProps<TOption, IsMulti, Group>, 'classNames'> & {
  label?: ReactNode
  required?: boolean
  error?: string
  errorClassName?: string
  classNames?: ClassNamesType
  containerClassName?: string
}

export default function Select<
  TOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<TOption> = GroupBase<TOption>
>({
  label,
  required,
  classNames,
  className,
  containerClassName,
  error,
  errorClassName,
  ...props
}: SelectProps<TOption, IsMulti, Group>) {
  return (
    <div className={cn('react-select', className)}>
      {label && (
        <TextLabel className="mb-1.5">
          <Label label={label} required={required} />
        </TextLabel>
      )}
      <ReactSelect<TOption, IsMulti, Group>
        instanceId={useId()}
        unstyled={true}
        classNames={makeClassNames(classNames, !!error)}
        className={containerClassName}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
