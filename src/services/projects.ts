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
  try {
    await axios.delete('/api/project', { params: { id: id } })
  } catch (error) {
    if ((error as AxiosError).response) {
      // The request was made and the server responded with a status code
      console.log((error as AxiosError).response?.data)
      console.log((error as AxiosError).response?.status)
      console.log((error as AxiosError).response?.headers)
    } else if ((error as AxiosError).request) {
      // The request was made but no response was received
      console.log((error as AxiosError).request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', (error as AxiosError).message)
    }
    console.log((error as AxiosError).config)
    throw error // Rethrow the error to handle it in the calling code
  }
}