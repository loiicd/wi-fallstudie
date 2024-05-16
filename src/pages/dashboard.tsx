import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import { Card, Skeleton, Typography } from '@mui/material'
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'
import CardContent from '@mui/material/CardContent';
import RoleProvider from '../components/RoleProvider'

const DashboardPage = () => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  useEffect(() => {
    if (activeUser) {
      setLoadingProjects(true)
      getProjectsById(activeUser.id)
        .then((data) => setProjects(data))
        .catch((error) => alert(error))
        .finally(() => setLoadingProjects(false))
    }
  }, [activeUser])

  return (
    <StandardLayout>
      <h1>Dashboard</h1>

      <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
        <>
          <Typography variant='h6'>Deine Projektanträge</Typography>
          <Grid container gap={2} columns={4}>
            {projects.map((project) => (
              <Grid item xs={1}>
                <Card variant='elevation'>
                  <CardContent>
                    <Typography variant='h6' component="div">{project.title}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {project.project_lead?.firstname} {project.project_lead?.lastname}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {loadingProjects ? [1, 2, 3 ,4].map(() => (
              <Grid item xs={1}>
                  <Skeleton variant="rectangular" height={108} />
                </Grid>
            )) : null}
          </Grid>
        </>
      </RoleProvider>

      <Typography variant='h6' sx={{ marginTop: 4 }}>Übersicht</Typography>
    </StandardLayout>
  )
}

export default DashboardPage