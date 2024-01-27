import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Flex,
  InputGroup,
} from '@chakra-ui/react'
import { useField } from 'formik'
import { InputFieldType } from './FormComponent'

export default function FormInput({
  label,
  name,
  error,
  touched,
  placeholder,
  maxLength,
  value,
  required,
  labelStyle,
  disabled,
  fieldType,
  showLength = false,
  labelInfo = () => null,
  ...rest
}: InputFieldType) {
  return (
    <FormControl
      isInvalid={error && touched ? true : false}
      isRequired={required}
    >
      <Flex justifyContent="space-between">
        {label && (
          <FormLabel {...labelStyle} htmlFor={name}>
            {label}
            {labelInfo()}
          </FormLabel>
        )}{' '}
        {maxLength && showLength && (
          <Text color="brand.primaryBrand">
            {value?.length || 0}/{maxLength} Characters
          </Text>
        )}
      </Flex>
      <InputGroup>
        <Input
          type={fieldType}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength ?? 500}
          id={name}
          value={value}
          {...rest}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
export function InputFormControl({ name, ...rest }: InputFieldType) {
  const [field, { error, touched }, helper] = useField(name)

  return (
    <FormInput
      {...rest}
      {...field}
      value={field.value}
      error={error}
      touched={touched}
      onChange={(e) => {
        console.log(e.target.value)
        if (rest.onChange) {
          rest.onChange(e)
        }
        console.log(e.target.value)
        helper.setValue(e.target.value)
      }}
    />
  )
}
