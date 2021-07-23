import { Suspense } from "react"
import { BlitzPage, useQuery, useParam, useMutation, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Box, Text } from "@chakra-ui/react"
import getProject from "app/projects/queries/getProject"
import colors from "app/projects/colors"
import { UpdateProject } from "app/projects/validations"
import { Form, FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import PageTitle from "app/core/components/PageTitle"
import LabeledSelect from "app/core/components/LabeledSelect"
import updateProject from "app/projects/mutations/updateProject"

const EditProject: BlitzPage = () => {
  const router = useRouter()
  return (
    <Box>
      <PageTitle>Projects</PageTitle>
      <Suspense fallback={null}>
        <ProjectForm onSuccess={() => router.push(Routes.Projects())} />
      </Suspense>
    </Box>
  )
}

type ProjectFormProps = {
  onSuccess?: () => void
}

const ProjectForm = (props: ProjectFormProps) => {
  const id = useParam("id", "number")
  const [project] = useQuery(getProject, { id })
  const [updateProjectMutation] = useMutation(updateProject)
  if (project === null) return <Text>The project could not be found</Text>

  return (
    <Form
      submitText="Edit Project"
      schema={UpdateProject}
      initialValues={project}
      onSubmit={async (values) => {
        try {
          await updateProjectMutation(values)
          props.onSuccess?.()
        } catch (error) {
          return { [FORM_ERROR]: error.toString() }
        }
      }}
    >
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledSelect name="color" label="Color">
        {(colors || []).map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </LabeledSelect>
    </Form>
  )
}

EditProject.authenticate = true
EditProject.getLayout = (page) => (
  <Layout containerW="xl" title="Project">
    {page}
  </Layout>
)

export default EditProject
