'use client'

import { AnyObject } from '@/utils/type-interface'
import { useId } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import { FieldError } from 'rizzui'
import TextLabel from '../text/label'
import { ClassNamesType, makeClassNames } from './style'

export type SelectOptionType = AnyObject & {
  label: string
  value: string
}

export type SelectProps<OptionType> = Omit<
  ReactSelectProps<OptionType>,
  'classNames'
> & {
  label?: string
  error?: string
  errorClassName?: string
  classNames?: ClassNamesType
}

export default function Select<OptionType>({
  label,
  classNames,
  error,
  errorClassName,
  ...props
}: SelectProps<OptionType>) {
  return (
    <div className="react-select">
      {label && <TextLabel className="mb-1.5">{label}</TextLabel>}
      <ReactSelect
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
