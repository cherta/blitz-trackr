import { z } from "zod"
import colors from "./colors"

export const UpdateProject = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().refine((val) => colors.includes(val)),
})
