'use client'

import { useId } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import TextLabel from '../text/label'
import { defaultClassNames } from './style'

export type SelectProps = ReactSelectProps & {
  label?: string
}

export default function Select({ label, classNames, ...props }: SelectProps) {
  return (
    <div className="react-select">
      {label && <TextLabel className="mb-1">{label}</TextLabel>}
      <ReactSelect
        unstyled={true}
        classNames={{
          ...defaultClassNames,
          ...classNames,
        }}
        instanceId={useId()}
        {...props}
      />
    </div>
  )
}
