import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { getProjectsById } from '../services/projects'
import { Project } from '../types/project'
import { ApiResponse } from '../types/apiResponse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Alert, 
  Avatar, 
  Button,
  CardContent, 
  Input, 
  ListSubheader, 
  Rating, 
  Skeleton, 
  Stack, 
  Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import SubmitDeleteDialog from '../components/submitDeleteDialog'
import AddProjectDialog from '../components/addProjectDialog'
import RateProjectDialog from '../components/rateProjectDialog'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AddIcon from '@mui/icons-material/Add'
import { postComment, deleteComment, updateComment } from '../services/comment'
import { LoadingButton } from '@mui/lab'
import HeroActions from '../components/projectPage/heroActions'
import { UserContext } from '../context/userContext'
import GeneralSection from '../components/projectPage/generalSection'
import DescriptionSection from '../components/projectPage/descriptionSection'
import StatusSection from '../components/projectPage/statusSection'
import RolesSection from '../components/projectPage/rolesSection'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { activeUser } = useContext(UserContext)
  const [project, setProject] = useState<ApiResponse<Project>>({ state: 'loading' })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openRateProjectDialog, setOpenRateProjectDialog] = useState<boolean>(false)
  const [openNewCommentInput, setOpenNewCommentInput] = useState<boolean>(false)
  const [commentContent, setCommentContent] = useState<string>('')
  const [openUpdateCommentInputId, setOpenUpdateCommentInputId] = useState<string>('')
  const [updateCommentContent, setUpdateCommentContent] = useState<string>('')
  const [commentSaving, setCommentSaving] = useState<boolean>(false)

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

  }, [id, navigate, openRateProjectDialog, openAddProjectDialog, openNewCommentInput])

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  const handleNewComment = (content: string) => {
    if(project.state === 'success' && activeUser){
      setCommentSaving(true)
      postComment(project.data.id, activeUser.id, 'comment', content).then(() => {
        getProjectsById(id ?? '')
        .then(project => {
          setProject({ state: 'success', data: project[0]})
        })
        setOpenNewCommentInput(false)})
        setCommentContent('')
        setCommentSaving(false)
    }
  }

  const handleDeleteComment = (comment_id: string) => {
    setCommentSaving(true)
    deleteComment(comment_id).then(() => {
      setCommentSaving(false)
      getProjectsById(id ?? '')
      .then(project => {
        setProject({ state: 'success', data: project[0]})
      })
    })
  }

  const handleUpdateComment = (comment_id: string, content: string) => {
    setCommentSaving(true)
    updateComment(comment_id, content).then(() => {
      getProjectsById(id ?? '')
      .then(project => {
        setProject({ state: 'success', data: project[0]})
        setOpenUpdateCommentInputId('')
        setUpdateCommentContent('')
        setCommentSaving(false)
      })
    })
  }

  return (  
    <StandardLayout 
      heroTitle={project.state === 'success' ? project.data.title : '...'}
      heroActions={<HeroActions project={project} handleDelete={handleDelete} handleOpenAddProjectDialog={() => setOpenAddProjectDialog(true)} handleOpenRateProjectDialog={() => setOpenRateProjectDialog(true)} />}
      heroLoading={project.state === 'loading'}
    >

      <StatusSection />

      <Grid container spacing={2} columns={12}>
        <Grid item lg={9}>
          <Stack gap={2}>

            <GeneralSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />
            <DescriptionSection project={project.state === 'success' ? project.data : undefined} loading={project.state === 'loading'} />

            {project.state === 'success' ? 
              <Card>
                <CardContent>
                  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                    <Grid item>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Kommentare</Typography>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<AddIcon />} onClick={() => openNewCommentInput ? setOpenNewCommentInput(false) : setOpenNewCommentInput(true)}>Neuer Kommentar</Button>
                    </Grid>
                  </Grid>

                  {openNewCommentInput || project.data.comments?.length === 0 ? 
                    <>
                      <Input placeholder={'Kommentar'} 
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ padding: 2 }}
                        value={commentContent}
                        onChange = {(e) => setCommentContent(e.target.value)}
                        onSubmit={() => handleNewComment(commentContent)}
                      />
                      <Grid container justifyContent={'flex-end'} sx={{marginBottom: 2, marginTop: 1}}>
                        <Grid item>
                          <Button onClick={() => {
                            setOpenNewCommentInput(false)
                            setCommentContent('')
                          }}>Abbrechen</Button>
                        </Grid>
                        <Grid item>
                          <LoadingButton loading={commentSaving} onClick={() => handleNewComment(commentContent)}>Senden</LoadingButton>
                        </Grid>
                      </Grid>
                    </>
                  : null}

                  <Grid container spacing={2}>
                    {project.data.comments?.map(comment => (
                      <Grid item xs={12}>
                        <Card>
                          <CardContent>
                            <Grid direction={'row'} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                              <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Avatar sx={{ width: 30, height: 30, marginRight: 1}}>{comment.user.firstname[0]}{comment.user.lastname[0]}</Avatar>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">{comment.user.firstname} {comment.user.lastname}, {new Date(comment.created_at).toLocaleDateString()}</Typography>
                              </Grid>
                              <Grid item>
                                {comment.user.id === activeUser?.id || activeUser?.type === 'administrator' ?
                                  <>
                                    <Button title= "Bearbeiten" size="small" variant="text" startIcon={<ModeIcon />} onClick={() => {
                                      openUpdateCommentInputId === comment.id ? setOpenUpdateCommentInputId('') : setOpenUpdateCommentInputId(comment.id)
                                      openUpdateCommentInputId === comment.id ? setUpdateCommentContent('') : setUpdateCommentContent(comment.content)
                                    }} />
                                    <Button title='Löschen' size="small" variant="text" startIcon={<DeleteIcon />} onClick={() => handleDeleteComment(comment.id)}  />
                                  </>
                                : null}
                              </Grid>
                            </Grid>
                            {openUpdateCommentInputId === comment.id ? 
                              <>
                                <Input placeholder={'Kommentar'}
                                  multiline
                                  rows={4}
                                  fullWidth
                                  sx={{ padding: 2 }}
                                  value={updateCommentContent}
                                  onChange = {(e) => setUpdateCommentContent(e.target.value)}
                                  onSubmit={() => handleUpdateComment(comment.id, updateCommentContent)}
                                />
                                <Grid container justifyContent={'flex-end'} sx={{marginBottom: 2, marginTop: 1}}>
                                  <Grid item>
                                    <Button onClick={() => {
                                      setOpenUpdateCommentInputId('')
                                      setUpdateCommentContent('')
                                    }}>Abbrechen</Button>
                                  </Grid>
                                  <Grid item>
                                    <LoadingButton loading={commentSaving} onClick={() => handleUpdateComment(comment.id, updateCommentContent)}>Senden</LoadingButton>
                                  </Grid>
                                </Grid>
                              </>
                              :
                              <Typography>{comment.content}</Typography>
                            }
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              : null
            }
            </Stack>
        </Grid>
        <Grid item lg={3}>
          {project.state === 'success' ? 
            <>
              <RolesSection project={project.data} />
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
            :     
            <Stack gap={2}>
              <Card>
                <Skeleton variant='rounded' height={200} />
              </Card>
              <Card>
                <Skeleton variant='rounded' height={200} />
              </Card>  
            </Stack>        
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