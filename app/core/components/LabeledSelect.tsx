import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledSelect = forwardRef<HTMLInputElement, LabeledSelectProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl isInvalid={error && touched} {...outerProps}>
        <FormLabel fontSize="sm">{label}</FormLabel>
        <Select
          {...input}
          id={name}
          isInvalid={error && touched}
          disabled={submitting}
          size="sm"
          {...(props as any)}
          ref={ref}
        />

        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledSelect
