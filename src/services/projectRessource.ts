import axios from 'axios'
import ProjectRessourceGeneric from "../types/projectResourceGeneric"

export const saveRessource = async (ressource: ProjectRessourceGeneric): Promise<void> => {
  console.log("ressource", ressource)
  await axios.post('/api/projectRessources', ressource)
}

export const deleteRessource = async (ressource_id: string): Promise<void> => {
  await axios.delete(`/api/projectRessources`, { data: { id: ressource_id } })
}

export const getProjectRessourcesByType = async (project_id: string, type: string): Promise<ProjectRessourceGeneric[]> => {
  const response = await axios.get(`/api/projectRessources`, { params: { project_id, type } })
  return response.data
}