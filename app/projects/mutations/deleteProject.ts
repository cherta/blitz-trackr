import { resolver, Ctx } from "blitz"
import db from "db"

// export default resolver.pipe(
//   resolver.authorize(),
//   resolver.zod(UpdateProject),
//   async ({ id, name, color }) => {
//     const project = await db.project.update({ data: { name, color }, where: { id } })
//     return project
//   }
// )

export default async function deleteProject({ id }: { id: number }, ctx: Ctx) {
  ctx.session.$authorize()

  const project = await db.project.update({ data: { deletedAt: new Date() }, where: { id } })
  return project
}
