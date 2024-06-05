import { User } from './user'
import ProjectRessourceGeneric from './projectResourceGeneric'
export const projectStatus = ['Entwurf', 'Eingereicht', 'In Prüfung', 'Angenommen', 'Abgelehnt'] as const
export type ProjectStatus = typeof projectStatus[number]

export type Team = User & { role: string }

type ProjectRate = {
  user: User
  rate: number
}

export type ProjectComment = {
  id: string
  user: User
  content: string
  type: string
  created_at: string
}

export type ProjectRelation = {
  id: string
  project: Project
  role: string
  created_at: string
  created_from: User
}

export type ExternalProjectLink = {
  id?: string
  url: string
  type: string
}


export type Project = {
  id: string
  status: ProjectStatus
  title: string
  created_from: string,
  created_at: string
  start_date?: string
  end_date?: string
  project_lead?: User
  project_lead_id?: string // NOT FOR USE
  sub_project_lead?: User
  department?: string,
  location?: string,
  sub_project_lead_id?: string // NOT FOR USE
  fte_intern?: number
  fte_extern?: number
  investment?: number
  stakeholder?: string
  customer?: string
  dependencies?: string
  expected_effects?: string
  prio?: number,
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: Team[],
  rates: ProjectRate[]
  comments?: ProjectComment[]
  created_from_user?: User
  related_projects?: ProjectRelation[]
  ressources?: ProjectRessourceGeneric[]
  budget?: ProjectRessourceGeneric[]
  complexity?: ProjectRessourceGeneric[]
  links?: ExternalProjectLink[]
}

export type ProjectFormData = {
  id?: string
  status: ProjectStatus
  title: string
  created_from: string,
  start_date?: string | null
  end_date?: string | null
  project_lead_id?: string
  project_lead?: User // NOT FOR USE
  sub_project_lead_id?: string
  department?: string,
  location?: string,
  sub_project_lead?: User // NOT FOR USE
  fte_intern?: number
  fte_extern?: number
  investment?: number
  stakeholder?: string
  customer?: string
  dependencies?: string
  expected_effects?: string
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: (Team | string)[]
  ressources?: ProjectRessourceGeneric[]
  budget?: ProjectRessourceGeneric[]
  complexity?: ProjectRessourceGeneric[]
  links?: ExternalProjectLink[]
}