import StandardLayout from '../layout/StandardLayout'
import { Alert, Button, Card, CircularProgress, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Typography } from '@mui/material'
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'
import RoleProvider from '../components/RoleProvider'
import MyProjects from '../components/myProjects'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'
import AddProjectDialog from '../components/addProjectDialog'
import { ApiResponse } from '../types/apiResponse'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  useEffect(() => {
    if (activeUser) {
      getProjectsById(activeUser.id)
        .then(projects => setProjects({ state: 'success', data: projects }))
        .catch(error => setProjects({ state: 'error', message: error }))
    }
  }, [activeUser, openAddProjectDialog])

  return (
    <StandardLayout 
      heroTitle={`Willkommen zurück ${activeUser?.firstname}`}
    >
      <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
        <Typography variant='h6'>Meine Projektanträge</Typography>
          {projects.state === 'success' && projects.data.length === 0 ?
            <Alert 
              icon={<InfoOutlinedIcon fontSize="inherit" />} 
              severity="info"  
              action={
                <Button color="inherit" size="small" startIcon={<AddIcon fontSize="inherit" />} onClick={() => setOpenAddProjectDialog(true)}>
                  Projekt
                </Button>
              }
              sx={{ mt: 2, width: '50%' }}
            >
              Du hast derzeit keine Projektanträge
            </Alert>
            : <MyProjects projects={projects} loadingProjects={projects.state === 'loading'} cardClick={(project) => navigate('/project/' + project.id)}/>
        }
      </RoleProvider>

      <Typography variant='h6' sx={{ marginTop: 4 }}>Übersicht</Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            1
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            1
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            1
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            1
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card>
            <List subheader={<ListSubheader>Standort / Abteilung</ListSubheader>}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Test</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Test</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Test</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Test</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Test</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <List subheader={<ListSubheader>Deine Projektanträge</ListSubheader>}>
              {projects.state === 'success' && projects.data.map((project) => (
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate(`/project/${project.id}`)}>
                    <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
                    <ListItemText>{project.title}</ListItemText>
                    <ListItemSecondaryAction>{ new Date(project.created_at).toLocaleDateString() }</ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
              {projects.state === 'loading' ? <CircularProgress /> : null}
            </List>
          </Card>
        </Grid>
      </Grid>

      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </StandardLayout>
  )
}

export default DashboardPage