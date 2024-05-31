import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Grid, 
    Typography } from '@mui/material'
  import DeleteIcon from '@mui/icons-material/Delete'
  import AddIcon from '@mui/icons-material/Add'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Project } from '../../types/project'
import { RelatedProject } from '../../types/project'


interface RolesSectionProps {
  project: Project;
  openNewRelationDialog: boolean;
  setOpenNewRelationDialog: (value: boolean) => void;
}

const RolesSection: React.FC<RolesSectionProps> = ({ project, openNewRelationDialog, setOpenNewRelationDialog }) => {
  const handleDeleteProjectRelation = (relation_id: string) => {
        console.log('TODO: Delete Project Relation')
        alert('TODO: Delete Project Relation')
      }

    return (
        <>
            <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  Verwandte Projekte ({project.related_projects ? project.related_projects.length : '0'})
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                    <Grid item>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Verwandte Projekte</Typography>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<AddIcon />} onClick={() => openNewRelationDialog ? setOpenNewRelationDialog(false) : setOpenNewRelationDialog(true)}>Neue Beziehung</Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {project.related_projects?.map((related_project: RelatedProject) => (
                      <Grid item xs={12}>
                        <Card>
                          <CardContent>
                            <Grid direction={'row'} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                              <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">TODO: Project Header</Typography>
                              </Grid>
                              <Grid item>
                                <Button title='Löschen' size="small" variant="text" startIcon={<DeleteIcon />} onClick={() => handleDeleteProjectRelation(related_project.relation_id)}  />
                              </Grid>
                            </Grid>
                            <Typography>TODO: Related Project Content</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
        </>
    )
}

export default RolesSection