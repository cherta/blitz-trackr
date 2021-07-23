import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({ id }: { id?: number }) => {
  const project = await db.project.findUnique({ where: { id } })

  return project
})
