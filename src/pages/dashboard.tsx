import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import '../alien.css'
import { Typography } from '@mui/material'
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'

const DashboardPage = () => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, title: undefined, type: type as ProjectRole})
    } 
  }, [])

  useEffect(() => {
    if (activeUser) {
      getProjectsById(activeUser.id)
        .then((data) => setProjects(data))
    }
  })

  return (
    <StandardLayout>
      <h1>Dashboard</h1>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant='h6'>Aktuelle Projektanträge</Typography>
          {projects.map((project) => (
            <div>{project.title}</div>
          ))}
        </Grid>
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