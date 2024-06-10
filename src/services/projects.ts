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

export const postProject = async (projectFormData: ProjectFormData): Promise<string> => {
  const response = await axios.post('/api/project', projectFormData)
  return response.data.project_id
}

export const updateProject = async (project: Project): Promise<void> => {
  await axios.post('/api/project', project)
}

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete('/api/project', { data: { id: projectId } })
}

export const updatePrio = async (projectId: string, prio: number): Promise<void> => {
  await axios.post('/api/projectPriority', { project_id: projectId, prio: prio })
}