import { User } from './user'

type ProjectType = 'Entwurf' | 'Eingereicht' | 'In Prüfung' | 'Angenommen' | 'Abgelehnt'

type Team = User & { role: string }

export type Project = {
  id: string
  status: ProjectType
  title: string
  startDate?: Date
  endDate?: Date
  projectLead?: User
  subProjectLead?: User
  shortDescription?: string
  targetDescription?: string
  visionDescription?: string
  problemDescription?: string
  team: Team[]
}

export type ProjectFormData = {
  status: ProjectType
  title: string
  startDate?: Date
  endDate?: Date
  projectLead?: string
  subProjectLead?: string
  shortDescription?: string
  targetDescription?: string
  visionDescription?: string
  problemDescription?: string
  team: string[]
}