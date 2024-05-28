import { useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { getProjects } from '../../services/projects'
import { Project } from '../../types/project'
import Grid from '@mui/material/Grid'
import RoleProvider from '../RoleProvider'
import Card from '@mui/material/Card'
import ProjectBarChart from '../charts/projectBarChart'
import ProjectChart from '../charts/projectChart'
import Typography from '@mui/material/Typography'


const BusinessViewOverview = () => {
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects }))
      .catch(error => setProjects({ state: 'error', message: error }))
  }, [])

  return (
    <RoleProvider roles={['geschäftsleitung', 'administrator']} type='include'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <ProjectChart projects={projects.state === 'success' ? projects.data : []} loading={projects.state === 'loading'} />
            <Typography variant='subtitle1' textAlign='center' sx={{ marginBottom: 2 }}>Projekteinreichungen nach Monat</Typography>
          </Card>
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
      </Grid>
    </RoleProvider>
  )
}

export default BusinessViewOverview