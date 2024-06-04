import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { getProjectsById } from '../services/projects'
import { Project } from '../types/project'
import { ApiResponse } from '../types/apiResponse'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
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
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { ProjectRelationDialog } from '../components/projectPage/projectRelationDialog'
import RelationsSection from '../components/projectPage/projectRelationsSection'
import BudgetSection from '../components/projectPage/budgetSection'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PrioProjectDialog from '../components/prioProjectDialog'
import LinkSection from '../components/projectPage/linkSection'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openRateProjectDialog, setOpenRateProjectDialog] = useState<boolean>(false)
  const [openEvaluateDialog, setOpenEvaluateDialog] = useState<boolean>(false)
  const [openNewRelationDialog, setOpenNewRelationDialog] = useState<boolean>(false)
  const [openPrioDialog, setOpenPrioDialog] = useState<boolean>(false)

  const handleReloadProject = useCallback(() => {
    if (id) {
      getProjectsById(id)
        .then(project => {
          if (project.length === 0) {
            navigate('/notfound')
          } else {
            setProject({ state: 'success', data: project[0]})
          }
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
          handleOpenPrioDialog={() => setOpenPrioDialog(true)}
        />
      }
      heroLoading={project.state === 'loading'}
    >

      <StatusSection projectStatus={project.state === 'success' ? project.data.status : undefined} />

      <Grid container spacing={2} columns={12}>
        <Grid item lg={9}>
          <Stack gap={2}>

            <GeneralSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />
            <BudgetSection project={project.state === 'success' ? project.data : undefined} />

            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Stakeholder</Typography>
                    <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{project.state !== 'success' ? <Skeleton /> : project?.data.stakeholder ? project?.data.stakeholder : '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Abhängigkeiten</Typography>
                    <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{project.state !== 'success' ? <Skeleton /> : project?.data.dependencies ? project?.data.dependencies : '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Erwarteter Effekt</Typography>
                    <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{project.state !== 'success' ? <Skeleton /> : project?.data.expected_effects ? project?.data.expected_effects : '-' }</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <DescriptionSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />

            <RelationsSection 
              project={project.state === 'success' ? project.data : undefined}
              openNewRelationDialog={openNewRelationDialog}
              setOpenNewRelationDialog={() => setOpenNewRelationDialog(true)}
              handleReloadProject={handleReloadProject}
              loading={project.state !== 'success'}
            />

            <CommentSection 
              projectId={project.state === 'success' ? project.data.id: ""} 
              comments={project.state === 'success' ? project.data.comments: []} 
              handleReloadProject={handleReloadProject}
              loading={project.state !== 'success'}
            />
          </Stack>
        </Grid>
        {project.state === 'success' ? 
          <Grid item lg={3}>
            <RolesSection project={project.data} />
            <RateSection project={project.data} />
            <LinkSection project={project.data} />
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
          {openNewRelationDialog ? <ProjectRelationDialog project={project.data} setOpenNewRelationDialog={() => setOpenNewRelationDialog(false)} openNewRelationDialog={openNewRelationDialog} handleReloadProject={handleReloadProject}  /> : null}
          {openPrioDialog ? <PrioProjectDialog open={openPrioDialog} handleClose={() => setOpenPrioDialog(false)} project={project.data} /> : null}
        </>
        : null
      }
    </StandardLayout>
  )
}

export default ProjectPage