import { useSearchParams } from 'react-router-dom'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { getProjects } from '../services/projects'
import { ApiResponse } from '../types/apiResponse'
import { Project } from '../types/project'
import { Box, CircularProgress } from '@mui/material'
import CompareCard from '../components/compareCard'

const ProjectComparisonPage = () => {
  const [urlParams, setUrlParams] = useSearchParams()

  const firstProjectId = urlParams.get('firstProject')
  const secondProjectId = urlParams.get('secondProject')
  const thirdProjectId = urlParams.get('thirdProject')

  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })

  const [firstProject, setFirstProject] = useState<Project | undefined>(undefined)
  const [secondProject, setSecondProject] = useState<Project | undefined>(undefined)
  const [thirdProject, setThirdProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects }))
      .catch(error => setProjects({ state: 'error', message: error }))
  }, [])

  useEffect(() => {
    if (projects.state === 'success') {
      setFirstProject(projects.data.find(project => project.id === firstProjectId))
      setSecondProject(projects.data.find(project => project.id === secondProjectId))
      setThirdProject(projects.data.find(project => project.id === thirdProjectId))
    }
  }, [firstProjectId, secondProjectId, thirdProjectId, projects])

  const handleChangeSelect = (type: 'firstProject' | 'secondProject' | 'thirdProject', projectId?: string) => {
    if (projectId && projects.state === 'success') {
      urlParams.set(type, projectId)
      setUrlParams(urlParams)
    }
  }

  return (
    <StandardLayout heroTitle='Projektanträge vergleichen'>
      {projects.state === 'success' ? 
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete 
              disableClearable
              value={firstProject}
              options={projects.data}
              getOptionKey={option => option.id}
              getOptionLabel={option => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} />}
              onChange={(event, newValue) => handleChangeSelect('firstProject', newValue?.id)}
            />
            {firstProject ? <CompareCard project={firstProject} /> : null}
          </Grid>
          <Grid item xs={4}>
            <Autocomplete 
              disableClearable
              value={secondProject}
              options={projects.data}
              getOptionKey={option => option.id}
              getOptionLabel={option => option.title}
              renderInput={(params) => <TextField {...params} />} 
              onChange={(event, newValue) => handleChangeSelect('secondProject', newValue?.id)}
            />
            {secondProject ? <CompareCard project={secondProject} /> : null}
          </Grid>
          <Grid item xs={4}>
            <Autocomplete 
              disableClearable
              value={thirdProject}
              options={projects.data}
              getOptionKey={option => option.id}
              getOptionLabel={option => option.title}
              renderInput={(params) => <TextField {...params} />}
              onChange={(event, newValue) => handleChangeSelect('thirdProject', newValue?.id)}
            />
             {thirdProject ? <CompareCard project={thirdProject} /> : null}
          </Grid>
        </Grid>
        : projects.state === 'loading' ? 
        <Box sx={{ width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
        </Box>
        : 'error'
        }
    </StandardLayout>    
  )
}

export default ProjectComparisonPage