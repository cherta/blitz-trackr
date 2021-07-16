import { Box, Divider, Heading, HeadingProps } from "@chakra-ui/react"

export default function PageTitle(props: HeadingProps) {
  return (
    <Box mb="4">
      <Heading {...props} />
      <Divider />
    </Box>
  )
}
