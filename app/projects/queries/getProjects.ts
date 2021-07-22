import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "asc" },
    where: { deletedAt: null },
  })

  return projects
})
