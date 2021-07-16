import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"

const Home: BlitzPage = () => {
  return (
    <Center h="90vh">
      <VStack>
        <Heading size="4xl">Blitz Trackr</Heading>
        <Heading as="h2" size="md">
          Track your hours like a pro
        </Heading>
      </VStack>
    </Center>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
