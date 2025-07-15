import Input from './input'
import InputNumberSeparator, {
  InputNumberSeparatorProps,
} from './number-separator'

export type InputRupiahProps = InputNumberSeparatorProps

export default function InputRupiah({ ...props }: InputRupiahProps) {
  return (
    <InputNumberSeparator
      CustomInput={CustomRupiahInput as React.ComponentType<unknown>}
      {...props}
    />
  )
}

function CustomRupiahInput({ ...props }) {
  return (
    <Input prefix="Rp" className="[&_.rizzui-input-field]:ps-1" {...props} />
  )
}
