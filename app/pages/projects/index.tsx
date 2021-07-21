import { Suspense } from "react"
import { BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import getProjects from "app/projects/queries/getProjects"
import ProjectColor from "app/projects/components/ProjectColor"
import PageTitle from "app/core/components/PageTitle"

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
  const [projects] = useQuery(getProjects, null)

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
                <Td>{project.id}</Td>
                <Td>{project.name}</Td>
                <Td>
                  <ProjectColor color={project.color} />
                </Td>
                <Td>
                  <IconButton
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
