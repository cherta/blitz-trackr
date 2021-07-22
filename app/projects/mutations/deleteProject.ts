import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({ id }) => {
  const project = await db.project.update({ data: { deletedAt: new Date() }, where: { id } })
  return project
})
