import axios from 'axios'

export const getProjects = async () => {
  const response = await axios.get('/api/projects')
  const data = response.data.map((project: any) => ({ ...project, startDate: new Date(project.startDate), endDate: new Date(project.endDate) }))
  return data
}