import { useNavigate, useParams } from 'react-router-dom'
import { FunctionComponent, useEffect, useState } from 'react'
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
import { Avatar, Button, ButtonGroup, CardContent, ListItemAvatar, ListSubheader, Stack, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import SubmitDeleteDialog from '../components/submitDeleteDialog'
import AddProjectDialog from '../components/addProjectDialog'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { ProjectRole, User } from '../types/user'
import Cookies from 'js-cookie'

interface HeroActionsProps {
  project: ApiResponse<Project>
  handleDelete: () => void
  handleOpenAddProjectDialog: () => void
}

const HeroActions: FunctionComponent<HeroActionsProps> = ({ project, handleDelete, handleOpenAddProjectDialog }) => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  console.log('Project', project)
  console.log(activeUser)

  return (
    <Stack direction='row' gap={2} alignItems='center'>
      <ButtonGroup variant='contained'>
        <Tooltip title='Projekt vergleichen'>
          <Button 
            disabled={project.state !== 'success'}
            onClick={() => navigate(`/project/comparison?firstProject=${project.state === 'success' ? project.data.id : null}`)}
          >
            <CompareArrowsIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup variant='contained' disabled={project.state !== 'success' || project.data.created_from !== activeUser?.id}>
        <Tooltip title='Bearbeiten'>
          <Button onClick={handleOpenAddProjectDialog}>
            <ModeIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Löschen'>
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  )
}

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)

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
      heroActions={<HeroActions project={project} handleDelete={handleDelete} handleOpenAddProjectDialog={() => setOpenAddProjectDialog(true)} />}
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
                  <ListItemText primary={`${project.data.project_lead?.firstname} ${project.data.project_lead?.lastname}`} secondary={project.data.project_lead?.email} />
                </ListItem>
                <ListSubheader component="div">Stellv. Projektleiter</ListSubheader>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{project.data.sub_project_lead?.firstname[0]}{project.data.sub_project_lead?.lastname[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${project.data.sub_project_lead?.firstname} ${project.data.sub_project_lead?.lastname}`} secondary={project.data.sub_project_lead?.email} />
                </ListItem>
                <ListSubheader component="div">Projektteam</ListSubheader>
                {project.data.team.map(teamUser => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{teamUser.firstname[0]}{teamUser.lastname[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${teamUser.firstname} ${teamUser.lastname}`} secondary={teamUser.email} />
                  </ListItem> 
                ))}
              </List>
            </Card>
            : null
          }
        </Grid>
      </Grid>
      {openDeleteDialog && project.state === 'success' ? <SubmitDeleteDialog openDialog={openDeleteDialog} handleClose={() => setOpenDeleteDialog(false)} projectId={project.data.id} /> : null}
      {openAddProjectDialog && project.state === 'success' ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} project={project.data} /> : null}
    </StandardLayout>
  )
}

export default ProjectPage