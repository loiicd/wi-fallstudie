import { useNavigate, useParams } from 'react-router-dom'
import { FunctionComponent, useEffect, useState } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { getProjectsById } from '../services/projects'
import { Project, projectTypes } from '../types/project'
import { ApiResponse } from '../types/apiResponse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Alert, Avatar, AvatarGroup, Button, ButtonGroup, CardContent, ListItemAvatar, ListSubheader, Rating, Stack, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import SubmitDeleteDialog from '../components/submitDeleteDialog'
import AddProjectDialog from '../components/addProjectDialog'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { ProjectRole, User } from '../types/user'
import Cookies from 'js-cookie'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import RateProjectDialog from '../components/rateProjectDialog'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AddIcon from '@mui/icons-material/Add'
import { createCommentTable, postComment } from '../services/comment'

interface HeroActionsProps {
  project: ApiResponse<Project>
  handleDelete: () => void
  handleOpenAddProjectDialog: () => void
  handleOpenRateProjectDialog: () => void
}

const HeroActions: FunctionComponent<HeroActionsProps> = ({ project, handleDelete, handleOpenAddProjectDialog, handleOpenRateProjectDialog }) => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  return (
    <Stack direction='row' gap={2} alignItems='center'>
      <ButtonGroup variant='contained'>
        <Tooltip title='Projekt bewerten'>
          <Button 
            disabled={project.state !== 'success'} 
            onClick={handleOpenRateProjectDialog}
          >
            <ThumbsUpDownIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Projekt vergleichen'>
          <Button 
            disabled={project.state !== 'success'}
            onClick={() => navigate(`/project/comparison?firstProject=${project.state === 'success' ? project.data.id : null}`)}
          >
            <CompareArrowsIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup variant='contained' disabled={project.state !== 'success' || project.data.created_from !== activeUser?.id}>
        <Tooltip title='Bearbeiten'>
          <Button onClick={handleOpenAddProjectDialog}>
            <ModeIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Löschen'>
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  )
}

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openRateProjectDialog, setOpenRateProjectDialog] = useState<boolean>(false)
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } else navigate('/login')
  }, [])

  useEffect(() => {
    if (id) {
      getProjectsById(id)
      .then(project => {
        console.log(project[0]);
        setProject({ state: 'success', data: project[0]})
      })
    } else {
      navigate('/notfound')
    }

  }, [id, navigate, openRateProjectDialog, openAddProjectDialog])

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  return (  
    <StandardLayout 
      heroTitle={project.state === 'success' ? project.data.title : '...'}
      heroActions={<HeroActions project={project} handleDelete={handleDelete} handleOpenAddProjectDialog={() => setOpenAddProjectDialog(true)} handleOpenRateProjectDialog={() => setOpenRateProjectDialog(true)} />}
      heroLoading={project.state === 'loading'}
    >
      <Stepper sx={{ marginBottom: 4 }}>
        {projectTypes.map(projectType => (
          <Step>
            <StepLabel>{projectType}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={2} columns={12}>
        <Grid item lg={9}>
          {project.state === 'success' ? 
            <Stack gap={2}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Allgemein</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Startdatum</Typography>
                      <Typography>{project.data.start_date ? new Date(project.data.start_date).toLocaleDateString() : '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Enddatum</Typography>
                      <Typography>{project.data.end_date ? new Date(project.data.end_date).toLocaleDateString() : '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Erstellt von</Typography>
                      <Typography>{project.data.created_from}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Erstellt am</Typography>
                      <Typography>{project.data.created_at ? new Date(project.data.created_at).toLocaleDateString() : '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Beschreibungen</Typography>
                  <Typography variant='h6'>Kurzbeschreibung</Typography>
                  <Typography>{project.data.short_description}</Typography>
                  <Typography variant='h6'>Ziel</Typography>
                  <Typography>{project.data.target_description}</Typography>
                  <Typography variant='h6'>Vision</Typography>
                  <Typography>{project.data.vision_description}</Typography>
                  <Typography variant='h6'>Problemstellung</Typography>
                  <Typography>{project.data.problem_description}</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Kommentare</Typography>
                  {activeUser && <Button onClick={() => postComment(project.data.id, activeUser.id, 'comment', 'test')}>Dummy Kommentar erstellen</Button>}
                  <Grid container spacing={2}>
                    {project.data.comments?.map(comment => (
                      <Grid item xs={12}>
                        <Card>
                          <CardContent>
                            <Stack direction='row' justifyContent='space-between'>
                              <Typography>{comment.user.firstname} {comment.user.lastname}</Typography>
                              <Typography>{new Date(comment.created_at).toLocaleString()}</Typography>
                            </Stack>
                            <Typography>{comment.content}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
            : null
          }
        </Grid>
        <Grid item lg={3}>
          {project.state === 'success' ? 
            <>
              <Card>
                <List subheader={<ListSubheader>Projektleiter</ListSubheader>}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{project.data.project_lead?.firstname[0]}{project.data.project_lead?.lastname[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${project.data.project_lead?.firstname} ${project.data.project_lead?.lastname}`} secondary={project.data.project_lead?.email} />
                  </ListItem>
                  <ListSubheader component="div">Stellv. Projektleiter</ListSubheader>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{project.data.sub_project_lead?.firstname[0]}{project.data.sub_project_lead?.lastname[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${project.data.sub_project_lead?.firstname} ${project.data.sub_project_lead?.lastname}`} secondary={project.data.sub_project_lead?.email} />
                  </ListItem>
                  <ListSubheader component="div">Projektteam</ListSubheader>
                  <ListItem>
                    <AvatarGroup max={6}>
                      {project.data.team.map(teamUser => (
                        <Tooltip title={`${teamUser.firstname} ${teamUser.lastname}`}>
                          <Avatar>{teamUser.firstname[0]}{teamUser.lastname[0]}</Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </ListItem> 
                </List>
              </Card>
              <Card sx={{ marginTop: 2}}>
                <List subheader={<ListSubheader>Bewertungen</ListSubheader>}>
                  {project.data.rates.map((rate) => (
                    <ListItem>
                      <Stack>
                        <Typography component="legend">{rate.user.firstname} {rate.user.lastname}</Typography>
                        <Rating value={rate.rate} readOnly />
                      </Stack>
                    </ListItem>
                  ))}
                  {project.data.rates.length === 0 ? 
                    <ListItem>
                      <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">Es gibt derzeit keine Berwertungen</Alert>
                    </ListItem>
                    : 
                    <ListItem>
                      <Stack>
                        <Typography component="legend">Durchschnitt</Typography>
                        <Rating value={project.data.rates.reduce((sum, rate) => sum + rate.rate, 0) / project.data.rates.length} readOnly precision={0.1}/>
                      </Stack>
                    </ListItem>
                  }
                </List>
              </Card>
            </>
            : null
          }
        </Grid>
      </Grid>
      {openDeleteDialog && project.state === 'success' ? <SubmitDeleteDialog openDialog={openDeleteDialog} handleClose={() => setOpenDeleteDialog(false)} projectId={project.data.id} /> : null}
      {openAddProjectDialog && project.state === 'success' ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} project={project.data} /> : null}
      {openRateProjectDialog && project.state === 'success' ? <RateProjectDialog openDialog={openRateProjectDialog} handleClose={() => setOpenRateProjectDialog(false)} projectId={project.data.id} /> : null}
    </StandardLayout>
  )
}

export default ProjectPage