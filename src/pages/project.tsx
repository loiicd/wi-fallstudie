import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { getProjectsById } from '../services/projects'
import { Project, projectTypes } from '../types/project'
import { ApiResponse } from '../types/apiResponse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Avatar, Button, CardContent, ListItemAvatar, ListSubheader, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import SubmitDeleteDialog from '../components/submitDeleteDialog'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      getProjectsById(id)
        .then(project => setProject({ state: 'success', data: project[0]}))
    } else {
      navigate('/notfound')
    }
  }, [id, navigate])

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  return (  
    <StandardLayout 
      heroTitle={project.state === 'success' ? project.data.title : '...'}
      heroActions={
        <Stack direction='row' gap={2} alignItems='center'>
          <Button variant='contained' disabled startIcon={<ModeIcon />}>Bearbeiten</Button>
          <Button variant='contained' startIcon={<DeleteIcon />} onClick={handleDelete}>Löschen</Button>
        </Stack>
      }
      heroLoading={project.state === 'loading'}
    >
      <Stepper sx={{ marginBottom: 4 }}>
        {projectTypes.map(projectType => (
          <Step>
            <StepLabel>{projectType}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={2} columns={12}>
        <Grid item lg={9}>
          {project.state === 'success' ? 
            <Stack gap={2}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Allgemein</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Rollen</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Beschreibungen</Typography>
                  <Typography variant='h6'>Kurzbeschreibung</Typography>
                  <Typography>{project.data.short_description}</Typography>
                  <Typography variant='h6'>Ziel</Typography>
                  <Typography>{project.data.target_description}</Typography>
                  <Typography variant='h6'>Vision</Typography>
                  <Typography>{project.data.vision_description}</Typography>
                  <Typography variant='h6'>Problemstellung</Typography>
                  <Typography>{project.data.problem_description}</Typography>
                </CardContent>
              </Card>
            </Stack>
            : null
          }
        </Grid>
        <Grid item lg={3}>
          {project.state === 'success' ? 
            <Card>
              <List>
                <ListSubheader component="div">Projektleiter</ListSubheader>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{project.data.project_lead?.firstname[0]}{project.data.project_lead?.lastname[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${project.data.project_lead?.firstname} ${project.data.project_lead?.lastname}`} secondary={project.data.project_lead?.type} />
                </ListItem>
                <ListSubheader component="div">Stellv. Projektleiter</ListSubheader>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{project.data.sub_project_lead?.firstname[0]}{project.data.sub_project_lead?.lastname[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${project.data.sub_project_lead?.firstname} ${project.data.sub_project_lead?.lastname}`} secondary={project.data.sub_project_lead?.type} />
                </ListItem>
                <ListSubheader component="div">Projektteam</ListSubheader>
                {project.data.team.map(teamUser => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{teamUser.firstname[0]}{teamUser.lastname[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${teamUser.firstname} ${teamUser.lastname}`} secondary={teamUser.role} />
                  </ListItem> 
                ))}
              </List>
            </Card>
            : null
          }
        </Grid>
      </Grid>
      {openDeleteDialog && project.state === 'success' ? <SubmitDeleteDialog openDialog={openDeleteDialog} handleClose={() => setOpenDeleteDialog(false)} projectId={project.data.id} /> : null}
    </StandardLayout>
  )
}

export default ProjectPage