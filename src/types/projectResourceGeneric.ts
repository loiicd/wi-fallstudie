import { Project } from './project'

type ProjectRessourceGeneric = {
  id?: string
  project_id?: string
  project?: Project
  title: string
  value: string
  date?: string
  type: string
}

export default ProjectRessourceGeneric