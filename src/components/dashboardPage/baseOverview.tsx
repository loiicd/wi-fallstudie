import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { Project } from '../../types/project'
import { UserContext } from '../../context/userContext'
import { getProjectsById } from '../../services/projects'
import RoleProvider from '../RoleProvider'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AddProjectDialog from '../addProjectDialog'
import { useNavigate } from 'react-router-dom'

interface CardExampleProps {
  project: Project
}

const CardExample: FunctionComponent<CardExampleProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <Card>
      <Stack direction='row' >
        <Box sx={{ backgroundColor: '#F3927E', minWidth: 20 }}></Box>
        <Box>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              {project.title}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Startdatum</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">13.05.24</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Enddatum</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">13.05.24</Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {project.start_date}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
          </CardContent>
          <CardActions>
            <Button disabled size="small">Share</Button>
            <Button onClick={() => navigate(`/project/${project.id}`)} size="small">Learn More</Button>
          </CardActions>
        </Box>
      </Stack>
    </Card>
  )
}

const BaseOverView: FunctionComponent = () => {
  const { activeUser } = useContext(UserContext)
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)

  useEffect(() => {
    if (activeUser) {
      getProjectsById(activeUser.id)
        .then(projects => setProjects({ state: 'success', data: projects }))
        .catch(error => setProjects({ state: 'error', message: error }))
    }
  }, [activeUser, openAddProjectDialog])

  return (
    <RoleProvider roles={['base']} type='include'>
      <Typography variant='h6'>Meine Projektanträge</Typography>
      {projects.state === 'success' && projects.data.length === 0 ?
        <Alert 
          icon={<InfoOutlinedIcon fontSize="inherit" />} 
          severity="info"  
          action={
            <Button onClick={() => setOpenAddProjectDialog(true)} color="inherit" size="small" startIcon={<AddIcon fontSize="inherit" />}>
              Projekt
            </Button>
          }
          sx={{ mt: 2, width: '50%' }}
        >
          Du hast derzeit keine Projektanträge
        </Alert>
        : 
        <Grid container spacing={2} columns={4}>
          {projects.state === 'success' ? projects.data.map((project) => (
            <Grid item xs={1}>
              <CardExample project={project} />
            </Grid>
            )): 
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={175} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={175} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={175} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={175} />
              </Grid>
            </>
          }
          {projects.state === 'success' ? 
            <Grid item xs={1}>
              <Button 
                onClick={() => setOpenAddProjectDialog(true)}
                startIcon={<AddIcon />} 
                sx={{ width: '100%', height: '100%', border: 'dashed', borderWidth: 2 }}
              >
                Projektantrag
              </Button>
            </Grid> : null 
          }
        </Grid>
      }
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </RoleProvider>
  )
}

export default BaseOverView