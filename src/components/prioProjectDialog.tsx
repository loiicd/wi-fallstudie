import { FunctionComponent, useState } from 'react'
import { Project } from '../types/project'
import { updateProject } from '../services/projects'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

interface PrioProjectDialogProps {
  open: boolean
  handleClose: () => void
  project: Project
}

const PrioProjectDialog: FunctionComponent<PrioProjectDialogProps> = ({ open, handleClose, project }) => {
  const [newPrio, setNewPrio] = useState<number>(project.prio ? project.prio : 0)
  const [isUpdatingPrio, setIsUpdatingPrio] = useState<boolean>(false)

  const marks = [{ value: 0, label: 'Low' }, { value: 5, label: 'Mid' }, { value: 10, label: 'High' }]

  const handleUpdatePrio = () => {
    setIsUpdatingPrio(true)
    updateProject({ ...project, prio: newPrio })
      .then(handleClose)
      .catch((error) => alert(error))
      .finally(() => setIsUpdatingPrio(false))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    > 
      <DialogContent dividers sx={{ position: 'relative', minHeight: 10 }}>
        <Slider 
          value={newPrio}
          step={1}
          marks={marks}
          min={0}
          max={10}
          valueLabelDisplay="on"
          onChange={(event, value) => setNewPrio(typeof value === 'number' ? value : value[0])}
          sx={{ marginTop: 4 }}
        />
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
        <LoadingButton variant='contained' loading={isUpdatingPrio} onClick={handleUpdatePrio}>Bestätigen</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default PrioProjectDialog