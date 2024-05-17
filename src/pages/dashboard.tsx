import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import { Card, Skeleton, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'
import RoleProvider from '../components/RoleProvider'
import MyProjects from '../components/myProjects'

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
        <Typography variant='h6'>Deine Projektanträge</Typography>
        <MyProjects projects={projects} loadingProjects={loadingProjects} />
      </RoleProvider>

      <Typography variant='h6' sx={{ marginTop: 4 }}>Übersicht</Typography>
    </StandardLayout>
  )
}

export default DashboardPage