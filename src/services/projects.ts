import axios, { AxiosError } from 'axios'
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

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete('/api/project', { params: { id: id }})
  .catch((error: AxiosError) => {
    throw new Error(error.response?.data as string)
  })
}