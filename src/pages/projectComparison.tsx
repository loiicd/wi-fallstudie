import { useSearchParams } from 'react-router-dom'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { getProjects } from '../services/projects'
import { ApiResponse } from '../types/apiResponse'
import { Project } from '../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

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
            {firstProject ?
              <Card sx={{ marginTop: 4 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>{firstProject.title}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Startdatum</Typography>
                  <Typography variant='h6'>{firstProject.start_date ? new Date(firstProject.start_date).toLocaleDateString() : '-'}</Typography>
                  <Typography variant='overline'>Enddatum</Typography>
                  <Typography variant='h6'>{firstProject.end_date ? new Date(firstProject.end_date).toLocaleDateString() : '-'}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Projektleiter</Typography>
                  <Typography variant='h6'>{firstProject.project_lead ? `${firstProject.project_lead.firstname} ${firstProject.project_lead.lastname}` : '-' }</Typography>
                  <Typography variant='overline'>Stellv. Projektleiter</Typography>
                  <Typography variant='h6'>{firstProject.sub_project_lead ? `${firstProject.sub_project_lead.firstname} ${firstProject.sub_project_lead.lastname}` : '-' }</Typography>
                </CardContent>
              </Card>
              : null
            }
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
            {secondProject ?
              <Card sx={{ marginTop: 4 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>{secondProject.title}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Startdatum</Typography>
                  <Typography variant='h6'>{secondProject.start_date ? new Date(secondProject.start_date).toLocaleDateString() : '-'}</Typography>
                  <Typography variant='overline'>Enddatum</Typography>
                  <Typography variant='h6'>{secondProject.end_date ? new Date(secondProject.end_date).toLocaleDateString() : '-'}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Projektleiter</Typography>
                  <Typography variant='h6'>{secondProject.project_lead ? `${secondProject.project_lead.firstname} ${secondProject.project_lead.lastname}` : '-' }</Typography>
                  <Typography variant='overline'>Stellv. Projektleiter</Typography>
                  <Typography variant='h6'>{secondProject.sub_project_lead ? `${secondProject.sub_project_lead.firstname} ${secondProject.sub_project_lead.lastname}` : '-' }</Typography>
                </CardContent>
              </Card>
              : null
            }
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
             {thirdProject ?
              <Card sx={{ marginTop: 4 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>{thirdProject.title}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Startdatum</Typography>
                  <Typography variant='h6'>{thirdProject.start_date ? new Date(thirdProject.start_date).toLocaleDateString() : '-'}</Typography>
                  <Typography variant='overline'>Enddatum</Typography>
                  <Typography variant='h6'>{thirdProject.end_date ? new Date(thirdProject.end_date).toLocaleDateString() : '-'}</Typography>
                  <Divider sx={{ margin: 4 }} />
                  <Typography variant='overline'>Projektleiter</Typography>
                  <Typography variant='h6'>{thirdProject.project_lead ? `${thirdProject.project_lead.firstname} ${thirdProject.project_lead.lastname}` : '-' }</Typography>
                  <Typography variant='overline'>Stellv. Projektleiter</Typography>
                  <Typography variant='h6'>{thirdProject.sub_project_lead ? `${thirdProject.sub_project_lead.firstname} ${thirdProject.sub_project_lead.lastname}` : '-' }</Typography>
                </CardContent>
              </Card>
              : null
            }
          </Grid>
        </Grid>
        : null
        }
    </StandardLayout>    
  )
}

export default ProjectComparisonPage