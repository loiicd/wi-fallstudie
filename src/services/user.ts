import axios from 'axios'
import { User, UserFormData } from '../types/user'

export const getUser = async (): Promise<User[]> => {
  const response = await axios.get('/api/user')
  return response.data
}

export const postUser = async (userFormData: UserFormData): Promise<void> => {
  const response = await axios.post('/api/user/', userFormData)
  console.log('Post Response', response)
}

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete('/api/user', { data: userId })
}