import { resolver } from "blitz"
import db from "db"
import { CreateProject } from "app/projects/validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateProject),
  async ({ name, color }) => {
    const project = await db.project.create({ data: { name, color } })
    return project
  }
)
