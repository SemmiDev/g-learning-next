'use client'

import { AnyObject } from '@/utils/type-interface'
import { useId } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import { FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'
import { makeClassNames } from './style'

export type SelectOptionType = AnyObject & {
  label: string
  value: string
}

export type SelectProps<OptionType> = ReactSelectProps<OptionType> & {
  label?: string
  required?: boolean
  error?: string
  errorClassName?: string
}

export default function Select<OptionType>({
  label,
  required,
  classNames,
  error,
  errorClassName,
  ...props
}: SelectProps<OptionType>) {
  return (
    <div className="react-select">
      {label && (
        <TextLabel className="mb-1.5">
          <Label label={label} required={required} />
        </TextLabel>
      )}
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
