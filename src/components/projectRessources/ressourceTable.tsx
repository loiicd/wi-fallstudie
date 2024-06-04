
import { useState, FunctionComponent, useEffect } from 'react';
import { Project } from '../../types/project';
import ProjectResourceGeneric from '../../types/projectResourceGeneric';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EmptyRow from '../table/emptyRow';
import LoadingRow from '../table/loadingRow';
import Button from '@mui/material/Button';
import {getProjectRessourcesByType, saveRessource} from '../../services/projectRessource';


interface ProjectRessourceTableProps {
  type: string
  project: Project

}

export const ProjectRessourceTable: FunctionComponent<ProjectRessourceTableProps> = ({ type, project}) => {
  const [projectRessources, setProjectRessources] = useState<ProjectResourceGeneric[]>(project.ressources || [])
  const [loading, setLoading] = useState<boolean>(false)

  const handleNewRessource = () => {
    setLoading(true)
    console.log("new ressource")
    saveRessource({
      project_id: project.id,
      title: "Test",
      value: "Test",
      type: type,
      date: new Date().toISOString()
    })
    setLoading(false)

  }
  
  useEffect(() => {
    setLoading(true)
    console.log("get project ressources")
    getProjectRessourcesByType(project.id, type).then((ressources) => {
      console.log("got project ressources")
      setProjectRessources(ressources)
      console.log("set project ressources")
      setLoading(false)
    })
  }, [])
  




  return (
      <>
        <Button onClick={() => handleNewRessource()}>
          <Typography variant="h6">Neue Ressource</Typography>
        </Button>
        <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Zeit</TableCell>
                    <TableCell>Beschreibung</TableCell>
                    <TableCell>Summe</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading? projectRessources.slice(0, 5).map((resource) => (
                    <TableRow key={resource.id}>
                      {type !== 'complexity_ressource' ? <TableCell>{resource.date}</TableCell> : null}
                      <TableCell>{new Date(resource.title).toLocaleDateString()}</TableCell>
                      <TableCell>{resource.value}</TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={3} loading={loading} />
                  <EmptyRow isEmpty={projectRessources.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>

      </>
    )
}