import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Box } from "@chakra-ui/react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Box>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
