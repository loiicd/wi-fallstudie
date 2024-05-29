import { User } from './user'

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
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: Team[],
  rates: ProjectRate[]
  comments?: ProjectComment[]
  created_from_user?: User
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
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: (Team | string)[]
}