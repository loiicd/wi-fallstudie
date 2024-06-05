import axios from 'axios'
import {ProjectProjectRelation} from '../types/projectProjectRelation'

export const saveRelation = async (relation: ProjectProjectRelation): Promise<void> => {
  await axios.post('/api/projectRelations', relation)
}

export const deleteProjectRelation = async (Relation_id: string): Promise<void> => {
  await axios.delete(`/api/projectRelations`, { data: { id: Relation_id } })
}

export const updateRelation = async (Relation_id: string, content: string): Promise<void> => {
  await axios.put(`/api/projectRelations`, { id: Relation_id, content })
}