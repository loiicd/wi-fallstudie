import axios from 'axios'

export const postRelation = async (project_id: string, user_id: string, type: string, content: string): Promise<void> => {
  await axios.post('/api/projectRelations', { project_id, user_id, type, content })
}

export const deleteRelation = async (Relation_id: string): Promise<void> => {
  await axios.delete(`/api/projectRelations`, { data: { id: Relation_id } })
}

export const updateRelation = async (Relation_id: string, content: string): Promise<void> => {
  await axios.put(`/api/projectRelations`, { id: Relation_id, content })
}

export const createProject_Project_Relation_Table = async (): Promise<void> => {
    console.log('CREATE ...')
    await axios.post('/api/projectRelations', {method: 'CREATE'})
    .then((response) => {
        console.log('CREATED')
        console.log(response)
        console.log(response.data)
    })
}