import { FunctionComponent, useContext, useState } from 'react'
import { ProjectRateSection } from '../types/project'
import { postProjectRate } from '../services/projectRate'
import { UserContext } from '../context/userContext'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogContent from '@mui/material/DialogContent'
import Rating from '@mui/material/Rating'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

interface RateProjectDialogProps {
  openDialog: boolean
  handleClose: () => void
  projectId: string
  section: ProjectRateSection
}

const RateProjectDialog: FunctionComponent<RateProjectDialogProps> = ({ openDialog, handleClose, projectId, section }) => {
  const { activeUser } = useContext(UserContext)
  const [rate, setRate] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmitRate = () => {
    if (activeUser) {
      setLoading(true)
      postProjectRate(projectId, activeUser?.id, rate, section)
        .then(handleClose)
        .catch(error => alert(error))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='xs'
    >
      <Stack justifyContent='center' alignItems='center'>
        <DialogTitle id="alert-dialog-title">Projektantrag bewerten</DialogTitle>
        <DialogContent>
          <Rating size='large' onChange={(event, value) => setRate(value ? value : 0)} />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
          <LoadingButton variant='contained' loading={loading} onClick={handleSubmitRate}>Bestätigen</LoadingButton>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}

export default RateProjectDialog