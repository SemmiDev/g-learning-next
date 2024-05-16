import cn from '@/utils/class-names'

const controlStyles = {
  base: 'h-10 border rounded-md bg-white ring-[0.6px] hover:cursor-pointer',
  focus: 'border-muted ring-muted bg-transparent',
  nonFocus: 'border-muted ring-muted bg-transparent hover:border-primary',
}
const placeholderStyles = 'text-gray-lighter pl-2.5 py-0.5'
const selectInputStyles = 'pl-2.5 py-0.5 [&>input:focus]:[box-shadow:none]'
const valueContainerStyles = 'p-1 gap-1'
const singleValueStyles = 'leading-7 ml-2.5'
const multiValueStyles =
  'bg-gray-50 rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:text-red-dark text-gray hover:border-red-lighter rounded-md'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles =
  'text-gray-lighter p-1 rounded-md hover:text-red-dark'
const indicatorSeparatorStyles = 'bg-gray-lighter'
const dropdownIndicatorStyles =
  'p-1 text-gray-lighter rounded-md hover:text-primary-dark'
const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray text-sm'
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-50 active:bg-gray-100',
  selected:
    "bg-blue-50 after:content-['✔'] after:ml-2 after:text-primary text-gray",
}
const noOptionsMessageStyles =
  'text-gray p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm'

export const defaultClassNames = (error?: boolean) => ({
  control: ({ isFocused }: { isFocused: boolean }) =>
    cn(
      controlStyles.base,
      isFocused ? controlStyles.focus : controlStyles.nonFocus,
      {
        '!border-red [&.is-hover]:!border-red [&.is-focus]:!border-red !ring-red !bg-transparent':
          error,
      }
    ),
  placeholder: () => placeholderStyles,
  input: () => selectInputStyles,
  valueContainer: () => valueContainerStyles,
  singleValue: () => singleValueStyles,
  multiValue: () => multiValueStyles,
  multiValueLabel: () => multiValueLabelStyles,
  multiValueRemove: () => multiValueRemoveStyles,
  indicatorsContainer: () => indicatorsContainerStyles,
  clearIndicator: () => clearIndicatorStyles,
  indicatorSeparator: () => indicatorSeparatorStyles,
  dropdownIndicator: () => dropdownIndicatorStyles,
  menu: () => menuStyles,
  groupHeading: () => groupHeadingStyles,
  option: ({
    isFocused,
    isSelected,
  }: {
    isFocused: boolean
    isSelected: boolean
  }) =>
    cn(
      optionStyles.base,
      isSelected && optionStyles.selected,
      isFocused && optionStyles.focus
    ),
  noOptionsMessage: () => noOptionsMessageStyles,
})
