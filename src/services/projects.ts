import axios from 'axios'
import { Project, ProjectFormData } from '../types/project'

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get('/api/projects')
  return response.data
}

export const getProjectsById = async (id: string): Promise<Project[]> => {
  const response = await axios.get('/api/project', { params: { id: id } })
  return response.data
}

export const postProject = async (projectFormData: ProjectFormData): Promise<void> => {
  await axios.post('/api/project', projectFormData)
}

export const updateProject = async (project: Project): Promise<void> => {
  console.log('project to update', project)
  await axios.post('/api/project', project)
}

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete('/api/project', { data: { id: projectId } })
}
