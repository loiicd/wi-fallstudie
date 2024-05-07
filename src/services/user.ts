import axios from 'axios'
import { User, UserFormData } from '../types/user'

export const getUser = async (): Promise<User[]> => {
  const response = await axios.get('/api/user')
  return response.data
}

// export const postUser = async (user: UserFormData): Promise<void> => {
//   const response = await axios.post('/api/user', { user: user })
//   console.log('Post Response', response)
// }

export const postUser = async (user: UserFormData): Promise<void> => {
const response = await fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ user }),
})
console.log('Post Response', response)
}