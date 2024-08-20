import Input from './input'
import InputNumber, { InputNumberProps } from './number'

export type InputRupiahProps = InputNumberProps

export default function InputRupiah({ ...props }: InputRupiahProps) {
  return (
    <InputNumber
      customInput={CustomRupiahInput as React.ComponentType<unknown>}
      {...props}
    />
  )
}

function CustomRupiahInput({ ...props }) {
  return (
    <Input prefix="Rp" className="[&_.rizzui-input-field]:ps-1" {...props} />
  )
}
