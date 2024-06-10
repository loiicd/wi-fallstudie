import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { Project } from '../../types/project'
import { UserContext } from '../../context/userContext'
import { getProjectsById } from '../../services/projects'
import { useNavigate } from 'react-router-dom'
import RoleProvider from '../RoleProvider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import AddIcon from '@mui/icons-material/Add'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AddProjectDialog from '../addProjectsDialog/addProjectDialog'
import MetricCard from './metricCard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'

interface CardExampleProps {
  project: Project
}

const CardExample: FunctionComponent<CardExampleProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ width: '100%', height: '100%', minHeight: "160px"}}>
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
                <Typography variant="body2" color="text.secondary">{project?.start_date ? new Date(project.start_date).toLocaleDateString(): "-"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Enddatum</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">{project?.end_date ? new Date(project.end_date).toLocaleDateString() : "-"}</Typography>
              </Grid>
            </Grid>
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

  const submittedProjects = projects.state === 'success' ? projects.data.filter(project => project.status === 'Eingereicht' && project.created_from_user!.id === activeUser!.id).length : 0
  const leadProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.project_lead_id === activeUser!.id).length : 0
  const subLeadProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.sub_project_lead_id === activeUser!.id).length : 0
  const auftraggeberProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.auftraggeber_id === activeUser!.id).length : 0

  useEffect(() => {
    if (activeUser) {
      getProjectsById(activeUser.id)
        .then(projects => setProjects({ state: 'success', data: projects }))
        .catch(error => setProjects({ state: 'error', message: error }))
    }
  }, [activeUser, openAddProjectDialog])

  return (
    <RoleProvider roles={['base', 'projektleitung']} type='include'>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MetricCard 
            label='Eingereichte Projektanträge' 
            value={projects.state === 'success' ? `${submittedProjects.toString()} Stk.` : '?'}
            icon={<AssignmentIcon sx={{ color: 'white', backgroundColor: '#02B2B0', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Projektleitung' 
            value={projects.state === 'success' ? `${leadProjects.toString()} Stk.` : '?'}
            icon={<PersonIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Stellv. Projektleitung' 
            value={projects.state === 'success' ? `${subLeadProjects.toString()} Stk.` : '?'}
            icon={<SupervisorAccountIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Auftraggeber' 
            value={projects.state === 'success' ? `${auftraggeberProjects.toString()} Stk.` : '?'}
            icon={<BusinessCenterIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
      </Grid>
      <Typography variant='h6'>Meine Projektanträge</Typography>
      {projects.state === 'success' ?
        <Grid container spacing={2} columns={4} sx={{marginTop: 1}}>
          {projects.data.map((project) => (
            <Grid item xs={1}>
              <CardExample project={project} />
            </Grid>
            ))
          }
          <Grid item xs={1}>
            <Button 
              onClick={() => setOpenAddProjectDialog(true)}
              startIcon={<AddIcon />} 
              sx={{ width: '100%', height: '100%', minHeight: "160px", border: 'dashed', borderWidth: 2 }}
            >
              Projektantrag
            </Button>
          </Grid> 
        </Grid>
      :
        <>
        <Grid container spacing={2} columns={4}>
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
          </Grid>
        </>
        }
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </RoleProvider>
  )
}

export default BaseOverView