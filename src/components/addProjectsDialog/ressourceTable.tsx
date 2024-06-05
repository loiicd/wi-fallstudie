
import { useState, FunctionComponent, useEffect, useCallback } from 'react';
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
  dialog_heading?: string, 
  editable?: boolean

}

export const ProjectRessourceTable: FunctionComponent<ProjectRessourceTableProps> = ({ type, project, column_labels, dialog_heading, editable = true}) => {
  const [projectRessources, setProjectRessources] = useState<ProjectResourceGeneric[]>(project.ressources || [])
  const [loading, setLoading] = useState<boolean>(true)
  const [openNewProjectRessourceDialog, setOpenNewProjectRessourceDialog] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const handleReload = useCallback(() => {
    setLoading(true);
    getProjectRessourcesByType(project.id, type).then((ressources) => {
      setProjectRessources(ressources);
      setLoading(false);
    });
  }, []);
  
  useEffect(() => {
    handleReload();
  }, [handleReload]);
  
  const handleDeleteRessource = (ressource_id: string) => {
    setDeleting(true);
    deleteRessource(ressource_id).then(() => {
      handleReload();
    }).finally(() => {
      setDeleting(false);
    });
  };

  const total = projectRessources.reduce((sum, resource) => sum + parseInt(resource.value), 0);

  return (
      <>
        <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {column_labels.includes("Monat") ? <TableCell>{column_labels[0]}</TableCell> : null}
                    <TableCell>{column_labels[column_labels.length - 2]}</TableCell>
                    <TableCell align="right">{column_labels[column_labels.length - 1]}</TableCell>
                    {editable &&
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => setOpenNewProjectRessourceDialog(true)}><AddIcon /></IconButton>
                      </TableCell>
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading? projectRessources.map((resource) => (
                    <TableRow hover key={resource.id} >
                      {column_labels.includes("Monat") ? <TableCell>{new Date(resource.date as string).toLocaleDateString('de-DE', { year: 'numeric', month: 'short' })}</TableCell> : null}
                      <TableCell>{resource.title}</TableCell>
                      <TableCell align="right">{resource.value}</TableCell>
                      {editable &&
                        <TableCell align="right">
                          <IconButton disabled={deleting} size='small' onClick={() => handleDeleteRessource(resource.id as string)}><DeleteOutlineOutlinedIcon style={{ fontSize: 16 }}/></IconButton>
                        </TableCell>
                      }
                    </TableRow>
                  )) : null}

                  {!loading && projectRessources.length !== 0 && (column_labels.includes("FTE") || column_labels.includes("EUR")) ? 
                  <TableRow>
                    <TableCell />
                      <TableCell style={{fontWeight: 'bold'}}>Summe</TableCell>
                      <TableCell style={{fontWeight: 'bold'}} align="right">{total}</TableCell>
                    <TableCell />
                  </TableRow>
                  : null}
                  
                  <LoadingRow cellCount={editable ? column_labels.length+1 : column_labels.length} loading={loading} />
                  {!loading ? <EmptyRow isEmpty={projectRessources.length === 0} columns={editable ? column_labels.length+1 : column_labels.length} /> : null}

                </TableBody>
              </Table>
            </TableContainer>
            {openNewProjectRessourceDialog && editable? 
              <ProjectRessourceDialog 
                project={project} 
                openNewProjectRessourceDialog={openNewProjectRessourceDialog} 
                setOpenNewProjectRessourceDialog={setOpenNewProjectRessourceDialog} 
                handleReload={handleReload}
                type={type}
                labels={column_labels}
                dialog_heading={dialog_heading || column_labels[0]}/>
              : null}
      </>
    )
}