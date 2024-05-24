import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useState } from 'react'
import { deleteProject } from '../services/projects'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { Button, DialogActions } from '@mui/material'

interface SubmitDeleteDialogProps {
  openDialog: boolean
  handleClose: () => void
  projectId: string
}

const SubmitDeleteDialog: FunctionComponent<SubmitDeleteDialogProps> = ({ openDialog, handleClose, projectId }) => {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleSubmitDelete = () => {
    setIsDeleting(true)
    deleteProject(projectId)
      .then(() => {
        handleClose()
        navigate('/projects')
      })
      .catch(error => alert(error))
      .finally(() => setIsDeleting(false))
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='xs'
    >
      <Stack justifyContent='center' alignItems='center'>
        <DialogTitle id="alert-dialog-title">Projektantrag löschen?</DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
          <LoadingButton variant='contained' loading={isDeleting} onClick={handleSubmitDelete}>Bestätigen</LoadingButton>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}

export default SubmitDeleteDialog