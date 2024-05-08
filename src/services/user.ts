import axios from 'axios'
import { User } from '../types/user'

export const getUser = async (userId: string): Promise<User[]> => {
  const response = await axios.get(`/api/user/${userId}`)
  return response.data
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get('/api/users')
  return response.data
}