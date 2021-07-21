import db from "./index"

const seed = async () => {
  await db.project.create({ data: { name: "Blitz Trackr" } })
  await db.project.create({ data: { name: "PTO" } })
  await db.project.create({ data: { name: "Mentoring" } })
}

export default seed
