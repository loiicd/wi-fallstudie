import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { getProjectsById } from '../services/projects'
import { Project } from '../types/project'
import { ApiResponse } from '../types/apiResponse'
import { Skeleton, Stack } from '@mui/material'
import SubmitDeleteDialog from '../components/submitDeleteDialog'
import AddProjectDialog from '../components/addProjectDialog'
import RateProjectDialog from '../components/rateProjectDialog'
import HeroActions from '../components/projectPage/heroActions'
import GeneralSection from '../components/projectPage/generalSection'
import DescriptionSection from '../components/projectPage/descriptionSection'
import StatusSection from '../components/projectPage/statusSection'
import RolesSection from '../components/projectPage/rolesSection'
import RateSection from '../components/projectPage/rateSection'
import EvaluateProjectDialog from '../components/evaluateProjectDialog'
import CommentSection from '../components/projectPage/commentSection'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openRateProjectDialog, setOpenRateProjectDialog] = useState<boolean>(false)
  const [openEvaluateDialog, setOpenEvaluateDialog] = useState<boolean>(false)

  const handleReloadProject = useCallback(() => {
    if (id) {
      getProjectsById(id)
        .then(project => {
          console.log(project[0]);
          setProject({ state: 'success', data: project[0]})
        })
    } else {
      navigate('/notfound')
    }
  }, [id, navigate])

  useEffect(() => {
    handleReloadProject()
  }, [id, navigate, openRateProjectDialog, openAddProjectDialog, openEvaluateDialog, handleReloadProject])

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  return (  
    <StandardLayout 
      heroTitle={project.state === 'success' ? project.data.title : '...'}
      heroActions={
        <HeroActions 
          project={project} 
          handleDelete={handleDelete} 
          handleOpenAddProjectDialog={() => setOpenAddProjectDialog(true)} 
          handleOpenRateProjectDialog={() => setOpenRateProjectDialog(true)} 
          handleOpenEvaluateDialog={() => setOpenEvaluateDialog(true)}
        />
      }
      heroLoading={project.state === 'loading'}
    >

      <StatusSection projectStatus={project.state === 'success' ? project.data.status : undefined} />

      <Grid container spacing={2} columns={12}>
        <Grid item lg={9}>
          <Stack gap={2}>

            <GeneralSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />
            <DescriptionSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />

            {project.state === 'success' ? 
              <CommentSection 
                projectId={project.data.id} 
                comments={project.data.comments} 
                handleReloadProject={handleReloadProject}
              />
              : null
            }
            </Stack>
        </Grid>
        {project.state === 'success' ? 
          <Grid item lg={3}>
            <RolesSection project={project.data} />
            <RateSection project={project.data} />
          </Grid>
          :     
          <Grid item lg={3}>
            <Stack gap={2}>
              <Card>
                <Skeleton variant='rounded' height={200} />
              </Card>
              <Card>
                <Skeleton variant='rounded' height={200} />
              </Card>  
            </Stack>        
          </Grid>
        }
      </Grid>
      {project.state === 'success' ? 
        <>
          {openDeleteDialog ? <SubmitDeleteDialog openDialog={openDeleteDialog} handleClose={() => setOpenDeleteDialog(false)} projectId={project.data.id} /> : null}
          {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} project={project.data} /> : null}
          {openRateProjectDialog ? <RateProjectDialog openDialog={openRateProjectDialog} handleClose={() => setOpenRateProjectDialog(false)} projectId={project.data.id} /> : null}
          {openEvaluateDialog ? <EvaluateProjectDialog open={openEvaluateDialog} handleClose={() => setOpenEvaluateDialog(false)} project={project.data} /> : null}
        </>
        : null
      }
    </StandardLayout>
  )
}

export default ProjectPage