import { User } from './user'

export const projectTypes = ['Entwurf', 'Eingereicht', 'In Prüfung', 'Angenommen', 'Abgelehnt'] as const
export type ProjectType = typeof projectTypes[number]

type Team = User & { role: string }

export type Project = {
  id: string
  status: ProjectType
  title: string
  created_from: User,
  created_at: string
  start_date?: string
  end_date?: string
  project_lead?: User
  project_lead_id?: string
  sub_project_lead?: User
  sub_project_lead_id?: string
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: Team[]
}

export type ProjectFormData = {
  id?: string
  status: ProjectType
  title: string
  created_from: string,
  start_date?: string | null
  end_date?: string | null
  project_lead_id?: string
  project_lead?: User // NOT FOR USE
  sub_project_lead_id?: string
  sub_project_lead?: User // NOT FOR USE
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: string[]
}