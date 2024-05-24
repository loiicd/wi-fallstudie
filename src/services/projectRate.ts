import axios from 'axios'

export const postProjectRate = async (project_id: string, user_id: string, rate: number): Promise<void> => {
  await axios.post('/api/rate', { project_id, user_id, rate })
}