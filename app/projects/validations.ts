import { z } from "zod"
import colors from "./colors"

const color = z.string().refine((val) => colors.includes(val))

export const CreateProject = z.object({
  name: z.string(),
  color,
})

export const UpdateProject = z.object({
  id: z.number(),
  name: z.string(),
  color,
})
