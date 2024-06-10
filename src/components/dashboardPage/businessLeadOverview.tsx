import { useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { getProjects } from '../../services/projects'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../types/project'
import Grid from '@mui/material/Grid'
import RoleProvider from '../RoleProvider'
import Card from '@mui/material/Card'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import LoadingRow from '../table/loadingRow'
import EmptyRow from '../table/emptyRow'
import MetricCard from './metricCard'
import ProjectPieChart from '../charts/projectPieChart'
import BudgetBarChart from '../charts/budgetBarChart'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EuroIcon from '@mui/icons-material/Euro'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const calculateBudgetSum = (projects: Project[]): number => {
  return projects.reduce((totalSum, project) => {
    const projectBudgetSum = project.budget?.reduce((sum, budgetItem) => {
      const valueNumber = parseFloat(budgetItem.value)
      return sum + (isNaN(valueNumber) ? 0 : valueNumber)
    }, 0) || 0
    return totalSum + projectBudgetSum
  }, 0)
}

const calculateAverageBudgetPerProject = (projects: Project[]): string => {
  const totalBudgetSum = projects.reduce((totalSum, project) => {
    const projectBudgetSum = project.budget?.reduce((sum, budgetItem) => {
      const valueNumber = parseFloat(budgetItem.value)
      return sum + (isNaN(valueNumber) ? 0 : valueNumber)
    }, 0) || 0
    return totalSum + projectBudgetSum
  }, 0)
  const numberOfProjects = projects.length
  return numberOfProjects > 0 ? (totalBudgetSum / numberOfProjects).toFixed(2) : '0'
}

const calculateAverageProjectDurationInMonths = (projects: Project[]): number => {
  const totalProjectDurationInMonths = projects.reduce((totalDuration, project) => {
    const startDate = project.start_date ? new Date(project.start_date) : null
    const endDate = project.end_date ? new Date(project.end_date) : new Date()
    if (startDate && endDate) {
      const startYear = startDate.getFullYear()
      const startMonth = startDate.getMonth()
      const endYear = endDate.getFullYear()
      const endMonth = endDate.getMonth()
      const durationInMonths = (endYear - startYear) * 12 + (endMonth - startMonth)
      return totalDuration + durationInMonths
    } else {
      return totalDuration
    }
  }, 0)
  const numberOfProjects = projects.length
  return Math.round(numberOfProjects > 0 ? totalProjectDurationInMonths / numberOfProjects : 0)
}

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
            label='Projektanträge' 
            value={projects.state === 'success' ? `${projects.data.length.toString()} Stk.` : '0'}
            icon={<AssignmentIcon sx={{ color: 'white', backgroundColor: '#02B2B0', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Budget Gesamt' 
            value={projects.state === 'success' ? `${calculateBudgetSum(projects.data).toString()} €` : ''}
            icon={<EuroIcon sx={{ color: 'white', backgroundColor: '#2E96FF', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Durschnittsbudget pro Projekt' 
            value={projects.state === 'success' ? `${calculateAverageBudgetPerProject(projects.data).toString()} €` : ''}
            icon={<EuroIcon sx={{ color: 'white', backgroundColor: '#B800D8', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
          />
        </Grid>
        <Grid item xs={3}>
          <MetricCard 
            label='Durchschnittliche Projektlaufzeit' 
            value={projects.state === 'success' ? `${calculateAverageProjectDurationInMonths(projects.data).toString()} Monate` : ''}
            icon={<AccessTimeIcon sx={{ color: 'white', backgroundColor: '#60009B', borderRadius: 100, padding: 1, fontSize: 40 }} />} 
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
        <Grid item xs={12}>
          <Card>
            <Box sx={{ m: 2 }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                  Vorgeschlagene Projektanträge
              </Typography>
            </Box>
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