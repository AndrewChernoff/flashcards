import Input, { InputProps } from '../input/input'

const ControlledInput = (props: InputProps) => {
  const { name, isSearch, label, isDisabled, error, placeholder, type, ...rest } = props

  return (
    <>
      <Input
        name={name}
        isSearch={isSearch}
        placeholder={placeholder}
        type={type}
        error={error}
        isDisabled={isDisabled}
        label={label}
        {...rest}
      />
    </>
  )
}

export default ControlledInput
