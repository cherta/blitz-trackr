import { resolver } from "blitz"
import db from "db"
import { UpdateProject } from "app/projects/validations"

export default resolver.pipe(
  resolver.zod(UpdateProject),
  resolver.authorize(),
  async ({ id, name, color }) => {
    const project = await db.project.update({ data: { name, color }, where: { id } })
    return project
  }
)
