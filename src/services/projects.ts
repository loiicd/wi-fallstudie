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
  await axios.put('/api/project', project, { timeout: 30000 })
    .then(response => console.log(response))
    .catch(error => {
      if (error.code === 'ECONNABORTED') {
        console.error('Anfrage wurde abgebrochen aufgrund eines Timeouts.');
      } else {
        console.error(error);
      }
    });
}