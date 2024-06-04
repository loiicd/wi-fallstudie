
import { useState, FunctionComponent, useEffect } from 'react';
import { Project } from '../../types/project';
import ProjectResourceGeneric from '../../types/projectResourceGeneric';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmptyRow from '../table/emptyRow';
import LoadingRow from '../table/loadingRow';
import {deleteRessource, getProjectRessourcesByType } from '../../services/projectRessource'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import ProjectRessourceDialog from "./projectRessourceDialog";


interface ProjectRessourceTableProps {
  type: string
  project: Project
  column_labels: string[]
  dialog_heading: string

}

export const ProjectRessourceTable: FunctionComponent<ProjectRessourceTableProps> = ({ type, project, column_labels, dialog_heading}) => {
  const [projectRessources, setProjectRessources] = useState<ProjectResourceGeneric[]>(project.ressources || [])
  const [loading, setLoading] = useState<boolean>(true)
  const [openNewProjectRessourceDialog, setOpenNewProjectRessourceDialog] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const handleReload = () => {}

  useEffect(() => {
    getProjectRessourcesByType(project.id, type).then((ressources) => {
      setProjectRessources(ressources)
      setLoading(false)
    })
  }, [ openNewProjectRessourceDialog , handleReload ])


  const handleDeleteRessource = (ressource_id: string) => {
    setDeleting(true)
    deleteRessource(ressource_id).then(() => {
      handleReload()
    }).finally(() => {
      setDeleting(false)
    })
  }

  return (
      <>
        <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {column_labels.includes("Monat") ? <TableCell>{column_labels[0]}</TableCell> : null}
                    <TableCell>{column_labels[column_labels.length - 2]}</TableCell>
                    <TableCell align="right">{column_labels[column_labels.length - 1]}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => setOpenNewProjectRessourceDialog(true)}><AddIcon /></IconButton>
                      </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading? projectRessources.map((resource) => (
                    <TableRow hover key={resource.id} >
                      {column_labels.includes("Monat") ? <TableCell>{new Date(resource.date as string).toLocaleDateString('de-DE', { year: 'numeric', month: 'short' })}</TableCell> : null}
                      <TableCell>{resource.title}</TableCell>
                      <TableCell align="right">{resource.value}</TableCell>
                      <TableCell align="right">
                        <IconButton disabled={deleting} onClick={() => handleDeleteRessource(resource.id as string)}><DeleteOutlineOutlinedIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={4} loading={loading} />
                  <EmptyRow isEmpty={projectRessources.length === 0} columns={4} />
                </TableBody>
              </Table>
            </TableContainer>
            {openNewProjectRessourceDialog ? 
              <ProjectRessourceDialog 
                project={project} 
                openNewProjectRessourceDialog={openNewProjectRessourceDialog} 
                setOpenNewProjectRessourceDialog={setOpenNewProjectRessourceDialog} 
                handleReload={handleReload}
                type={type}
                labels={column_labels}
                dialog_heading={dialog_heading}/>
              : null}
      </>
    )
}