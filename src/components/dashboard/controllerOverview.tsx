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

const ControllerOverview: FunctionComponent = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [submittedProjects, setSubmittedProjects] = useState<Project[]>([])
  const [approvedProjects, setApprovedProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects }))
      .catch(error => setProjects({ state: 'error', message: error }))
  }, [])

  useEffect(() => {
    if (projects.state === 'success') {
      setSubmittedProjects(projects.data.filter(project => project.status === 'Eingereicht'))
      setApprovedProjects(projects.data.filter(project => project.status === 'Angenommen'))
    }
  }, [projects])

  return (
    <RoleProvider roles={['controller']} type='include'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <Box sx={{ m: 2 }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                  Eingereichte Projektanträge
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>User</TableCell>
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
                variant="h6"
                id="tableTitle"
                component="div"
                >
                  Angenommene Projektanträge
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>User</TableCell>
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
      </Grid> 
    </RoleProvider>
  )
}

export default ControllerOverview