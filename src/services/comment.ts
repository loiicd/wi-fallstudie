import axios from 'axios'

export const postComment = async (project_id: string, user_id: string, type: string, content: string): Promise<void> => {
  await axios.post('/api/comments', { project_id, user_id, type, content })
}

export const deleteComment = async (comment_id: string): Promise<void> => {
  await axios.delete(`/api/comments/${comment_id}`)
}