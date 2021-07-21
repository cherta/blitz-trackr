import { Tag } from "@chakra-ui/react"
import { Project } from "db"

export default function ProjectColor({ color }: { color: Project["color"] }) {
  return <Tag colorScheme={color}>{color}</Tag>
}
