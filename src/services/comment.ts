import axios from 'axios'

export const postComment = async (project_id: string, user_id: string, type: string, content: string): Promise<void> => {
  await axios.post('/api/comments', { project_id, user_id, type, content })
}

export const deleteComment = async (comment_id: string): Promise<void> => {
  await axios.delete(`/api/comments`, { data: { id: comment_id } })
}

export const updateComment = async (comment_id: string, content: string): Promise<void> => {
  await axios.put(`/api/comments`, { id: comment_id, content })
}