import axios from 'axios'
import { ProjectRateSection } from '../types/project'

export const postProjectRate = async (project_id: string, user_id: string, rate: number, section: ProjectRateSection): Promise<void> => {
  await axios.post('/api/rate', { project_id, user_id, rate, section })
}