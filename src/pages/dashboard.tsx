import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import '../alien.css'
import { Card, Skeleton, Typography } from '@mui/material'
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'
import CardContent from '@mui/material/CardContent';

const DashboardPage = () => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, title: undefined, type: type as ProjectRole})
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
      <Typography variant='h6'>Deine Projektanträge</Typography>
      <Grid container gap={2} columns={4}>
        {projects.map((project) => (
          <Grid item xs={1}>
            <Card variant='elevation'>
              <CardContent>
                <Typography variant='h6' component="div">{project.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {/* {project.project_lead?.firstname} {project.project_lead?.lastname} */}
                  test
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {loadingProjects ? 
          <>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={108} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={108} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={108} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={108} />
            </Grid>
          </>
          : null
        }
      </Grid>

      {/* <div className="box-canvas">
        <div className="beam"></div>
        <div className="ship">
          <div className="ship-inner">
            <div className="alien-head">
            <div className="antennae"></div>
            <div className="mouth"></div>
          </div>
          </div>
        </div>
        <div className="bubble"></div>
      </div> */}
    </StandardLayout>
  )
}

export default DashboardPage