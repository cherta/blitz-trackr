import { Suspense } from "react"
import { BlitzPage, useMutation, useQuery, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import getProjects from "app/projects/queries/getProjects"
import ProjectColor from "app/projects/components/ProjectColor"
import PageTitle from "app/core/components/PageTitle"
import deleteProject from "app/projects/mutations/deleteProject"

const Projects: BlitzPage = () => {
  return (
    <Box>
      <PageTitle>Projects</PageTitle>
      <Suspense fallback={null}>
        <ProjectsTable />
      </Suspense>
    </Box>
  )
}

const ProjectsTable = () => {
  const toast = useToast()
  const [projects, { refetch }] = useQuery(getProjects, null)
  const [deleteProjectMutation] = useMutation(deleteProject)

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Color</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => {
            return (
              <Tr key={project.id}>
                <Td>
                  <Link href={Routes.EditProject({ id: project.id })}>
                    <ChakraLink>{project.id}</ChakraLink>
                  </Link>
                </Td>
                <Td>{project.name}</Td>
                <Td>
                  <ProjectColor color={project.color} />
                </Td>
                <Td>
                  <IconButton
                    onClick={async () => {
                      try {
                        if (confirm("Are you sure you want to delete this project?")) {
                          await deleteProjectMutation({ id: project.id })
                          toast({
                            description: "The project has been deleted",
                            duration: 30000,
                            isClosable: true,
                            status: "info",
                          })
                          await refetch()
                        }
                      } catch (e) {}
                    }}
                    aria-label={`Delete ${project.name} project`}
                    icon={<DeleteIcon />}
                    colorScheme="red"
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

Projects.authenticate = true
Projects.getLayout = (page) => (
  <Layout containerW="xl" title="Project list">
    {page}
  </Layout>
)

export default Projects
