import { useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { getProjects } from '../../services/projects'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../types/project'
import Grid from '@mui/material/Grid'
import RoleProvider from '../RoleProvider'
import Card from '@mui/material/Card'
import ProjectBarChart from '../charts/projectBarChart'
import ProjectChart from '../charts/projectChart'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import LoadingRow from '../table/loadingRow'
import EmptyRow from '../table/emptyRow'
import AdbIcon from '@mui/icons-material/Adb'
import MetricCard from './metricCard'
import ProjectPieChart from '../charts/projectPieChart'

const BusinessViewOverview = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects }))
      .catch(error => setProjects({ state: 'error', message: error }))
  }, [])

  return (
    <RoleProvider roles={['geschäftsleitung']} type='include'>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MetricCard 
            label='Aktive Projektanträge' 
            value='12'
            icon={<AdbIcon sx={{backgroundColor: 'red', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Budget' 
            value='12000'
            icon={<AdbIcon sx={{backgroundColor: 'red', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Kosten' 
            value='20000'
            icon={<AdbIcon sx={{backgroundColor: 'red', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Keine Ahnung was' 
            value='Daten'
            icon={<AdbIcon sx={{backgroundColor: 'red', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{marginTop: 1}}>
        <Grid item xs={8}>
          <Card>
            <ProjectChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} />
            <Typography variant='subtitle1' textAlign='center' sx={{ marginBottom: 2 }}>Projekteinreichungen nach Monat</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <ProjectPieChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <ProjectBarChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} type='department' />
            <Typography variant='subtitle1' textAlign='center' sx={{ marginBottom: 2 }}>Projekte pro Abteilungen</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <ProjectBarChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} type='location' />
            <Typography variant='subtitle1' textAlign='center' sx={{ marginBottom: 2 }}>Projekte pro Standorte</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Startdatum</TableCell>
                    <TableCell>Enddatum</TableCell>
                    <TableCell>Projektleiter</TableCell>
                    <TableCell>Stellv. Projektleiter</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.state === 'success' ? projects.data.slice(0, 5).map((project) => (
                    <TableRow
                      key={project.id}
                      hover
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.start_date ? new Date(project.start_date).toLocaleDateString() : null}</TableCell>
                      <TableCell>{project.end_date ? new Date(project.end_date).toLocaleDateString() : null}</TableCell>
                      <TableCell>{project.project_lead?.firstname} {project.project_lead?.lastname}</TableCell>
                      <TableCell>{project.sub_project_lead?.firstname} {project.sub_project_lead?.lastname}</TableCell>
                    </TableRow>
                  )) : null}
                  <LoadingRow cellCount={3} loading={projects.state === 'loading'} />
                  <EmptyRow isEmpty={projects.state === 'success' && projects.data.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </RoleProvider>
  )
}

export default BusinessViewOverview