import { SelectOptionType } from '@/components/ui'
import { AnyObject } from './type-interface'

export const selectOption = (
  value: string,
  attrs?: AnyObject
): SelectOptionType => ({
  label: value,
  value: value,
  ...attrs,
})
