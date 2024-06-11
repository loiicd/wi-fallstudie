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
import Box from '@mui/material/Box'
import AddProjectDialog from '../addProjectsDialog/addProjectDialog'
import MetricCard from './metricCard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import LoadingRow from '../table/loadingRow'
import EmptyRow from '../table/emptyRow'

interface CardExampleProps {
  project: Project
}

const CardExample: FunctionComponent<CardExampleProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ width: '100%', height: '100%', minHeight: "160px"}} onClick={() => navigate(`/project/${project.id}`)}>
      <Box>
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {project.title}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" alignItems='center' justifyContent='flex-start' display='flex'>
                <AccessTimeIcon fontSize='inherit' sx={{ marginRight: 1 }} />
                {project?.start_date ? new Date(project.start_date).toLocaleDateString() : "?"} - {project?.end_date ? new Date(project.end_date).toLocaleDateString() : "?"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" alignItems='center' justifyContent='flex-start' display='flex'>
                <PersonIcon fontSize='inherit' sx={{ marginRight: 1 }} />
                {project.project_lead?.firstname} {project.project_lead?.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" alignItems='center' justifyContent='flex-start' display='flex'>
              <SupervisorAccountIcon fontSize='inherit' sx={{ marginRight: 1 }} />
              {project.sub_project_lead?.firstname} {project.sub_project_lead?.lastname}
            </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  )
}

const BaseOverView: FunctionComponent = () => {
  const { activeUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)

  const submittedProjects = projects.state === 'success' ? projects.data.filter(project => project.status === 'Eingereicht' && project.created_from_user!.id === activeUser!.id) : []
  const leadProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.project_lead_id === activeUser!.id) : []
  const subLeadProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.sub_project_lead_id === activeUser!.id) : []
  const auftraggeberProjects = projects.state === 'success' ? projects.data.filter(project => project.status !== 'Entwurf' && project.auftraggeber_id === activeUser!.id) : []

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
            value={projects.state === 'success' ? `${(submittedProjects.length).toString()} Stk.` : '?'}
            icon={<AssignmentIcon sx={{ color: 'white', backgroundColor: '#02B2B0', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Projektleitung' 
            value={projects.state === 'success' ? `${(leadProjects.length).toString()} Stk.` : '?'}
            icon={<PersonIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Stellv. Projektleitung' 
            value={projects.state === 'success' ? `${(subLeadProjects.length).toString()} Stk.` : '?'}
            icon={<SupervisorAccountIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Auftraggeber' 
            value={projects.state === 'success' ? `${(auftraggeberProjects.length).toString()} Stk.` : '?'}
            icon={<BusinessCenterIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
      </Grid>
      <Typography variant='h5' sx={{ marginTop: 3}}>Meine Projektanträge</Typography>
      {projects.state === 'success' ?
        <Grid container spacing={2} columns={4} sx={{marginTop: 1}}>
          {submittedProjects.map((project) => (
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
      <Typography variant='h5' sx={{ marginTop: 3 }}>Projekte mit Rollen</Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={4}>
          <Card>
            <Box sx={{ m: 2 }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant='h6'
                component='div'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                >
                  <PersonIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Projektleitung
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Eingereicht von</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.state === 'success' ? leadProjects.slice(0, 5).map((project) => (
                    <TableRow
                      key={project.id}
                      hover
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{project.created_from_user?.firstname} {project.created_from_user?.lastname}</TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={3} loading={projects.state === 'loading'} />
                  <EmptyRow isEmpty={projects.state === 'success' && leadProjects.length === 0} />
                  {projects.state === 'success' ? <TableRow onClick={() => navigate('/projects')}>
                    <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                      <Typography variant='body2' color='grey'>
                        <Button variant='outlined'>
                          Alle Anzeigen
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <Box sx={{ m: 2 }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant='h6'
                component='div'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                >
                  <SupervisorAccountIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Stellv. Projektleitung
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Eingereicht von</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.state === 'success' ? submittedProjects.slice(0, 5).map((project) => (
                    <TableRow
                      key={project.id}
                      hover
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{project.created_from_user?.firstname} {project.created_from_user?.lastname}</TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={3} loading={projects.state === 'loading'} />
                  <EmptyRow isEmpty={projects.state === 'success' && submittedProjects.length === 0} />
                  {projects.state === 'success' ? <TableRow onClick={() => navigate('/projects')}>
                    <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                      <Typography variant='body2' color='grey'>
                        <Button variant='outlined'>
                          Alle Anzeigen
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow> : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <Box sx={{ m: 2 }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant='h6'
                component='div'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                >
                  <BusinessCenterIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Auftraggeber
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Eingereicht von</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.state === 'success' ? auftraggeberProjects.slice(0, 5).map((project) => (
                    <TableRow
                      key={project.id}
                      hover
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{project.created_from_user?.firstname} {project.created_from_user?.lastname}</TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={3} loading={projects.state === 'loading'} />
                  <EmptyRow isEmpty={projects.state === 'success' && auftraggeberProjects.length === 0} />
                  {projects.state === 'success' ?<TableRow onClick={() => navigate('/projects')}>
                    <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                      <Typography variant='body2' color='grey'>
                        <Button variant='outlined'>
                          Alle Anzeigen
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow> : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </RoleProvider>
  )
}

export default BaseOverView