import { Box, FormControl, FormErrorMessage, FormLabel, Input, NumberInput } from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl isInvalid={error && touched} {...outerProps}>
        <FormLabel fontSize="sm">{label}</FormLabel>
        {input.type === "number" ? (
          <NumberInput
            {...input}
            id={name}
            isInvalid={error && touched}
            disabled={submitting}
            size="sm"
            {...(props as any)}
            ref={ref}
          />
        ) : (
          <Input
            {...input}
            id={name}
            isInvalid={error && touched}
            disabled={submitting}
            size="sm"
            {...(props as any)}
            ref={ref}
          />
        )}

        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledTextField
