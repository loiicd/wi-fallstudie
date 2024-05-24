import axios from 'axios'

export const postComment = async (project_id: string, user_id: string, type: string, content: string): Promise<void> => {
  await axios.post('/api/comments', { project_id, user_id, type, content })
  .then((response) => {
    console.log(response)
    console.log('Comment created: ', response.data)
  })
}

export const createCommentTable = async (): Promise<void> => {
    console.log('Creating comment table')
    await axios.post('/api/comments', { method: 'CREATE' })
    .then((response) => {
        console.log('Comment table created: ', response.data)})
    .catch((error) => {
        console.log('status', error.response.status)
        console.error('message', error.message)
        console.log('data', error.response.data)
        console.log('headers', error.response.headers)
    })
}