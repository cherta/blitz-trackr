import { ReactNode, Suspense } from "react"
import { Head, Link, useMutation } from "blitz"
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Img,
  useColorModeValue,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import gravatar from "gravatar"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

type LayoutProps = {
  title?: string
  children: ReactNode
  containerW?: "sm" | "md" | "lg" | "xl"
}

const NavigationLinks = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      {user ? (
        <>
          <Button rounded="full" variant="link" cursor="pointer" onClick={() => logoutMutation()}>
            <Avatar size="sm" src={gravatar.url(user.email)} />
          </Button>
        </>
      ) : (
        <Link href="/login">
          <Button as="a" href="/login" variant="solid" colorScheme="teal" size="sm">
            Login
          </Button>
        </Link>
      )}
    </>
  )
}

const Navigation = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Img alt="BlitzTrackr logo" h="20" src="/logo.png" />
        </HStack>
        <Flex alignItems="center">
          <Suspense fallback={null}>
            <NavigationLinks />
          </Suspense>
        </Flex>
      </Flex>
    </Box>
  )
}

const Layout = ({ title, children, containerW = "sm" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Blitz Trackr"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid gap={4}>
        <GridItem>
          <Navigation />
        </GridItem>
        <GridItem>
          <Container maxW={`container.${containerW}`}>{children}</Container>
        </GridItem>
      </Grid>
    </>
  )
}

export default Layout
