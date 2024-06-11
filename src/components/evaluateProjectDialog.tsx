import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Project, ProjectStatus } from '../types/project'
import { updateProject } from '../services/projects'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import LinearProgress from '@mui/material/LinearProgress'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'

interface EvaluateProjectDialogProps {
  open: boolean
  handleClose: () => void
  project: Project
}

const EvaluateProjectDialog: FunctionComponent<EvaluateProjectDialogProps> = ({ open, handleClose, project }) => {
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(project.status)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false)

  const handleUpdateStatus = useCallback((status: ProjectStatus) => {
    setIsUpdatingStatus(true)
    setProjectStatus(status)
    updateProject({ ...project, status })
      .then(handleClose)
      .finally(() => setIsUpdatingStatus(false))
  }, [handleClose, project])

  useEffect(() => {
    if (project.status === 'Eingereicht') {
      setProjectStatus('In Prüfung')
      updateProject({ ...project, status: project.status })
    }
  }, [project])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    > 
      <DialogTitle>Projektbewertung</DialogTitle>
      <DialogContent sx={{ position: 'relative', minHeight: 10 }}>
        <DialogContentText>
          Bitte überprüfen Sie die Projektdetails und treffen Sie eine Entscheidung. Sie können das Projekt entweder annehmen oder ablehnen.
        </DialogContentText> 
        {isUpdatingStatus ? <LinearProgress sx={{ height: 10, borderRadius: 5 }} /> : null}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton 
          variant='contained' 
          color='error' 
          disabled={projectStatus === 'Abgelehnt'}
          loading={isUpdatingStatus}
          onClick={() => handleUpdateStatus('Abgelehnt')}
        >
          Ablehnen
        </LoadingButton>
        <LoadingButton 
          variant='contained' 
          color='success' 
          disabled={projectStatus === 'Angenommen'}
          loading={isUpdatingStatus}
          onClick={() => handleUpdateStatus('Angenommen')}
        >
          Annehmen
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default EvaluateProjectDialog