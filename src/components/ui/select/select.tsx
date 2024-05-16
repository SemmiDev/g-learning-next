'use client'

import { useId } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import TextLabel from '../text/label'
import { defaultClassNames } from './style'
import { FieldError } from 'rizzui'

export type SelectProps<OptionType> = ReactSelectProps<OptionType> & {
  label?: string
  error?: string
  errorClassName?: string
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
        classNames={{
          ...defaultClassNames(!!error),
          ...classNames,
        }}
        instanceId={useId()}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
