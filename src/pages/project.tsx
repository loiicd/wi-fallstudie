import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { getProjectsById } from '../services/projects'
import { Project } from '../types/project'
import { ApiResponse } from '../types/apiResponse'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })

  useEffect(() => {
    if (id) {
      getProjectsById(id)
        .then(project => setProject({ state: 'success', data: project[0]}))
    } else {
      navigate('/notfound')
    }
  })

  return (  
    <StandardLayout 
      heroTitle={project.state === 'success' ? project.data.title : '...'}
      heroLoading={project.state === 'loading'}
    >
      {/* <h1>{projekt?.name}</h1> */}
      <Grid container gap={4}>
        <Grid item xs={6}>
          <Card>
            {project.state === 'success' ? project.data.title : 'loading or error'}
          </Card>
        </Grid>
      </Grid>
    </StandardLayout>
  )
}

export default ProjectPage