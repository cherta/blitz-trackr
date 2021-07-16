import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
import { Alert, AlertIcon, AlertTitle, Button, VStack } from "@chakra-ui/react"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {submitError && (
            <Alert role="alert" status="error" mb="4" borderRadius="md">
              <AlertIcon />
              <AlertTitle>{submitError}</AlertTitle>
            </Alert>
          )}

          <VStack spacing="4">
            {children}
            {submitText && (
              <Button
                type="submit"
                disabled={submitting}
                variant="solid"
                colorScheme="twitter"
                size="sm"
                w="full"
              >
                {submitText}
              </Button>
            )}
          </VStack>
        </form>
      )}
    />
  )
}

export default Form
