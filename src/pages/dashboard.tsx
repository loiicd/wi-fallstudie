import StandardLayout from '../layout/StandardLayout'
import { Alert, Button, Typography } from '@mui/material'
import { Project } from '../types/project'
import { useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'
import RoleProvider from '../components/RoleProvider'
import MyProjects from '../components/myProjects'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate = useNavigate()
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
    <StandardLayout 
      heroTitle={`Willkommen zurück ${activeUser?.firstname}`}
    >
      <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
        <Typography variant='h6'>Meine Projektanträge</Typography>
        {projects.length === 0 && !loadingProjects ?
          <Alert 
            icon={<InfoOutlinedIcon fontSize="inherit" />} 
            severity="info"  
            action={
              <Button color="inherit" size="small" startIcon={<AddIcon fontSize="inherit" />} onClick={() => navigate('/projects')}>
                Projekt
              </Button>
            }
            sx={{ mt: 2, width: '50%' }}
          >
            Du hast derzeit keine Projektanträge
          </Alert>
          : <MyProjects projects={projects} loadingProjects={loadingProjects} />
        }
      </RoleProvider>

      <Typography variant='h6' sx={{ marginTop: 4 }}>Übersicht</Typography>
    </StandardLayout>
  )
}

export default DashboardPage