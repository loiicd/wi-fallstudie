export type Project = {
  id: string
  name: string

  projectLead: string
  deputyProjectLead: string


  startDate: Date
  endDate: Date

  members: {
    userId: string
    firstname: string
    lastname: string
    role: string
  }[]
}