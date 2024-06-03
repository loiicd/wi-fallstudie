import { FunctionComponent, useContext, useState } from 'react'
import { ProjectComment } from '../../types/project'
import { UserContext } from '../../context/userContext'
import { deleteComment, postComment, updateComment } from '../../services/comment'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Input from '@mui/material/Input'
import LoadingButton from '@mui/lab/LoadingButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'

interface CommentSectionProps {
  projectId: string
  comments?: ProjectComment[]
  handleReloadProject: () => void
  loading? : boolean
}

const CommentSection: FunctionComponent<CommentSectionProps> = ({ projectId, comments, handleReloadProject, loading}) => {
  const { activeUser } = useContext(UserContext)
  const [openNewCommentInput, setOpenNewCommentInput] = useState<boolean>(false)
  const [commentContent, setCommentContent] = useState<string>('')
  const [openUpdateCommentInputId, setOpenUpdateCommentInputId] = useState<string>('')
  const [updateCommentContent, setUpdateCommentContent] = useState<string>('')
  const [commentSaving, setCommentSaving] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleNewComment = (content: string) => {
    if(activeUser){
      setCommentSaving(true)
      postComment(projectId, activeUser.id, 'comment', content).then(() => {
        handleReloadProject()
        setOpenNewCommentInput(false)})
        setCommentContent('')
        setCommentSaving(false)
    }
  }

  const handleDeleteComment = (comment_id: string) => {
    setCommentSaving(true)
    deleteComment(comment_id).then(() => {
      setCommentSaving(false)
      handleReloadProject()
    })
  }

  const handleUpdateComment = (comment_id: string, content: string) => {
    setCommentSaving(true)
    updateComment(comment_id, content)
      .then(() => handleReloadProject())
  }

  return (  
    <Accordion
      expanded={expanded}
      onChange={() => loading? null : setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        Kommentare ({comments? comments.length : '-'})
      </AccordionSummary>
      <AccordionDetails>
        {loading ? null : 
        <>
          <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
            <Grid item>
              {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Kommentare</Typography>*/}
            </Grid>
            <Grid item>
              <Button startIcon={<AddIcon />} onClick={() => setOpenNewCommentInput(!openNewCommentInput)}>Neuer Kommentar</Button>
            </Grid>
          </Grid>

          {openNewCommentInput || comments?.length === 0 ? 
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
            {comments?.map(comment => (
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
        </>
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default CommentSection