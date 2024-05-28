import StandardLayout from '../layout/StandardLayout'
import { Alert, Box, Button, Typography } from '@mui/material'
import { Project } from '../types/project'
import { useContext, useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import RoleProvider from '../components/RoleProvider'
import MyProjects from '../components/myProjects'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'
import AddProjectDialog from '../components/addProjectDialog'
import { ApiResponse } from '../types/apiResponse'
import ControllerOverview from '../components/dashboard/controllerOverview'
import BaseOverView from '../components/dashboard/baseOverview'
import { UserContext } from '../context/userContext'
import BusinessViewOverview from '../components/dashboard/businessLeadOverview'
import ProjectChart from '../components/charts/projectChart'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { activeUser } = useContext(UserContext)
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)

  useEffect(() => {
    if (activeUser) {
      getProjectsById(activeUser.id)
        .then(projects => setProjects({ state: 'success', data: projects }))
        .catch(error => setProjects({ state: 'error', message: error }))
    }
  }, [activeUser, openAddProjectDialog])

  return (
    <StandardLayout 
      heroTitle={`Willkommen zurück ${activeUser?.firstname}`}
    >
      <RoleProvider roles={['administrator']} type='include'>
        <Typography variant='h6'>Meine Projektanträge</Typography>
          {projects.state === 'success' && projects.data.length === 0 ?
            <Alert 
              icon={<InfoOutlinedIcon fontSize="inherit" />} 
              severity="info"  
              action={
                <Button color="inherit" size="small" startIcon={<AddIcon fontSize="inherit" />} onClick={() => setOpenAddProjectDialog(true)}>
                  Projekt
                </Button>
              }
              sx={{ mt: 2, width: '50%' }}
            >
              Du hast derzeit keine Projektanträge
            </Alert>
            : <MyProjects projects={projects} loadingProjects={projects.state === 'loading'} cardClick={(project) => navigate('/project/' + project.id)}/>
        }
      </RoleProvider>

      <Box sx={{ margin: 4}}>Geschäftsführung View</Box>
      <BusinessViewOverview />

      <Box sx={{ margin: 4}}>Base View</Box>
      <BaseOverView />

      <Box sx={{ margin: 4}}>Controller View</Box>
      <ControllerOverview />

      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </StandardLayout>
  )
}

export default DashboardPage