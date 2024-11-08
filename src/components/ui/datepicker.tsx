'use client'

import cn from '@/utils/class-names'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import ReactDatePicker, {
  DatePickerProps as ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PiCalendarBlank, PiCaretDownBold, PiTimer } from 'react-icons/pi'
import { Input, InputProps } from 'rizzui'
import Label from './label'
registerLocale('id', id)

const calendarContainerClasses = {
  base: '[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md',
  monthContainer: {
    padding: '[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3',
  },
}

const prevNextButtonClasses = {
  base: '[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7',
  border:
    '[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md',
  size: '[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]',
  children: {
    position: '[&.react-datepicker>button>span]:top-0',
    border:
      '[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400',
    size: '[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]',
  },
}

const timeOnlyClasses = {
  base: '[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28',
}

export type DatePickerProps = ReactDatePickerProps & {
  inputProps?: InputProps
}

export const DatePicker = ({
  required,
  customInput,
  showPopperArrow = false,
  dateFormat = 'dd MMMM yyyy',
  onCalendarOpen,
  onCalendarClose,
  inputProps,
  calendarClassName,
  locale = 'id',
  timeCaption = 'Waktu',
  ...props
}: DatePickerProps) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)
  const handleCalenderOpen = () => setIsCalenderOpen(true)
  const handleCalenderClose = () => setIsCalenderOpen(false)

  const { label, labelClassName, ...otherInputProps } = inputProps ?? {}

  const icon = props.showTimeSelectOnly ? (
    <PiTimer className="size-5 text-gray-500" />
  ) : (
    <PiCalendarBlank className="size-5 text-gray-500" />
  )

  return (
    <div
      className={cn(
        'flex [&_.react-datepicker-wrapper]:flex [&_.react-datepicker-wrapper]:w-full',
        props?.className
      )}
    >
      <ReactDatePicker
        customInput={
          customInput || (
            <Input
              prefix={icon}
              suffix={
                <PiCaretDownBold
                  className={cn(
                    'size-4 text-gray-500 transition',
                    isCalenderOpen && 'rotate-180'
                  )}
                />
              }
              label={
                label ? <Label label={label} required={required} /> : undefined
              }
              labelClassName={cn(
                'text-gray-dark font-semibold',
                labelClassName
              )}
              {...otherInputProps}
            />
          )
        }
        locale={locale}
        timeCaption={timeCaption}
        showPopperArrow={showPopperArrow}
        dateFormat={dateFormat}
        onCalendarOpen={onCalendarOpen || handleCalenderOpen}
        onCalendarClose={onCalendarClose || handleCalenderClose}
        calendarClassName={cn(
          calendarContainerClasses.base,
          calendarContainerClasses.monthContainer.padding,
          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          timeOnlyClasses.base,
          calendarClassName
        )}
        {...props}
      />
    </div>
  )
}
