import { FunctionComponent, useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { getProjects } from '../../services/projects'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../types/project'
import RoleProvider from '../RoleProvider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoadingRow from '../table/loadingRow'
import EmptyRow from '../table/emptyRow'
import MetricCard from './metricCard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import VerifiedIcon from '@mui/icons-material/Verified'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import ProjectPieChart from '../charts/projectPieChart'
import BudgetBarChart from '../charts/budgetBarChart'

const ControllerOverview: FunctionComponent = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [submittedProjects, setSubmittedProjects] = useState<Project[]>([])
  const [auditProjects, setAuditProjects] = useState<Project[]>([])
  const [approvedProjects, setApprovedProjects] = useState<Project[]>([])
  const [declinedProjects, setDeclinedProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects }))
      .catch(error => setProjects({ state: 'error', message: error }))
  }, [])

  useEffect(() => {
    if (projects.state === 'success') {
      setSubmittedProjects(projects.data.filter(project => project.status === 'Eingereicht'))
      setAuditProjects(projects.data.filter(project => project.status === 'In Prüfung'))
      setApprovedProjects(projects.data.filter(project => project.status === 'Angenommen'))
      setDeclinedProjects(projects.data.filter(project => project.status === 'Abgelehnt'))
    }
  }, [projects])

  return (
    <RoleProvider roles={['controller']} type='include'>
       <Grid container spacing={2}>
        <Grid item xs={3}>
          <MetricCard 
            label='Eingereichte Projektanträge' 
            value={projects.state === 'success' ? `${submittedProjects.length.toString()} Stk.` : '?'}
            icon={<MoveToInboxIcon sx={{ color: 'white', backgroundColor: '#02B2B0', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='In Prüfung' 
            value={projects.state === 'success' ? `${auditProjects.length.toString()} Stk.` : '?'}
            icon={<AssignmentIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Angenommene Projektanträge' 
            value={projects.state === 'success' ? `${approvedProjects.length.toString()} Stk.` : '?'}
            icon={<VerifiedIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Abgelehnte Projektanträge' 
            value={projects.state === 'success' ? `${declinedProjects.length.toString()} Stk.` : '?'}
            icon={<DoNotDisturbOnIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{marginTop: 1}}>
        <Grid item xs={8}>
          <BudgetBarChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} />
        </Grid>
        <Grid item xs={4}>
          <ProjectPieChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} />
        </Grid>
        <Grid item xs={6}>
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
                  <MoveToInboxIcon sx={{ color: 'white', backgroundColor: '#02B2B0', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Eingereichte Projektanträge
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
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={6}>
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
                  <AssignmentIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  In Prüfung
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
                  {projects.state === 'success' ? auditProjects.slice(0, 5).map((project) => (
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
                  <EmptyRow isEmpty={projects.state === 'success' && auditProjects.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={6}>
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
                  <VerifiedIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Angenommene Projektanträge
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
                  {projects.state === 'success' ? approvedProjects.slice(0, 5).map((project) => (
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
                  <EmptyRow isEmpty={projects.state === 'success' && approvedProjects.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={6}>
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
                  <DoNotDisturbOnIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40, marginRight: 2 }} />
                  Abgelehnte Projektanträge
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
                  {projects.state === 'success' ? declinedProjects.slice(0, 5).map((project) => (
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
                  <EmptyRow isEmpty={projects.state === 'success' && declinedProjects.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid> 
    </RoleProvider>
  )
}

export default ControllerOverview