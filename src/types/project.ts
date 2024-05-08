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
  start_date?: Dayjs | null
  end_date?: Dayjs | null
  projectLead?: string
  subProjectLead?: string
  shortDescription?: string
  targetDescription?: string
  visionDescription?: string
  problemDescription?: string
  team: string[]
}