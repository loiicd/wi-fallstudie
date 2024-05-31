import React, { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent, 
  Grid, 
  Typography 
} from '@mui/material'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Project } from '../../types/project'
import { ProjectRelation } from '../../types/project'
import StatusChip from "../statusChip";
import { deleteProjectRelation } from "../../services/projectRelation";
import { useNavigate } from "react-router";


interface RolesSectionProps {
  project: Project;
  openNewRelationDialog: boolean;
  setOpenNewRelationDialog: (value: boolean) => void;
  handleReloadProject: () => void
}

const RolesSection: React.FC<RolesSectionProps> = ({ project, openNewRelationDialog, setOpenNewRelationDialog, handleReloadProject }) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleDeleteProjectRelation = (relation_id: string) => {
    deleteProjectRelation(relation_id)
      .then(() => handleReloadProject())
  }

  const handleAddButtonPressed = () => {
    setExpanded(!expanded ? true: true)
    setOpenNewRelationDialog(true)
  }

    return (
        <>
            <Accordion 
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
                <Box sx={{ display: "flex" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color='secondary' />}
                    sx={{ flexGrow: 1 }}
                  >
                    <Typography>Verwandte Projekte ({project.related_projects ? project.related_projects.length : '0'})</Typography>
                  </AccordionSummary>
                  <Box sx={{height: 48, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button startIcon={<AddIcon color='secondary' />}  onClick={() => handleAddButtonPressed()} />
                  </Box>
                </Box>
                <AccordionDetails>
                  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                    <Grid item>
                      <Button startIcon={<AddIcon />} onClick={() => openNewRelationDialog ? setOpenNewRelationDialog(false) : setOpenNewRelationDialog(true)}>Neue Beziehung</Button>
                    </Grid>
                    <Grid item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {project.related_projects?.map((related: ProjectRelation) => (
                      <Grid item xs={12}>
                        <Card>
                          <CardActionArea onClick={() => navigate(`/project/${related.project.id}`)}>
                            <CardContent>
                              <Grid direction={'row'} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Grid item xs={3}>
                                  <Typography color="text.secondary">{related.role.charAt(0).toUpperCase() + related.role.slice(1)}:</Typography>
                                </Grid> 
                                <Grid item xs={6}>
                                  <Typography sx={{fontWeight: 'bold'}}>{related.project.title}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <StatusChip value={related.project.status} />
                                </Grid>
                                <Grid item xs={1}>
                                  <Button title='Löschen' size="small" variant="text" startIcon={<DeleteOutlineOutlined />} onClick={() => handleDeleteProjectRelation(related.id)} />
                                </Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
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