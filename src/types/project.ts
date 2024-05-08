import { Dayjs } from 'dayjs'
import { User } from './user'

export type ProjectType = 'Entwurf' | 'Eingereicht' | 'In Prüfung' | 'Angenommen' | 'Abgelehnt'

type Team = User & { role: string }

export type Project = {
  id: string
  status: ProjectType
  title: string
  start_date?: string
  end_date?: string
  project_lead?: User
  sub_project_lead?: User
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: Team[]
}

export type ProjectFormData = {
  status: ProjectType
  title: string
  start_date?: Dayjs | null
  end_date?: Dayjs | null
  project_lead?: string
  sub_project_lead?: string
  short_description?: string
  target_description?: string
  vision_description?: string
  problem_description?: string
  team: string[]
}