import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, Rating } from '@mui/material'
import { postProjectRate } from '../services/projectRate'
import Cookies from 'js-cookie'
import { ProjectRole, User } from '../types/user'

interface RateProjectDialogProps {
  openDialog: boolean
  handleClose: () => void
  projectId: string
}

const RateProjectDialog: FunctionComponent<RateProjectDialogProps> = ({ openDialog, handleClose, projectId }) => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)
  const [rate, setRate] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  const handleSubmitRate = () => {
    if (activeUser) {
      setLoading(true)
      postProjectRate(projectId, activeUser?.id, rate)
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
          <Rating size='large' onChange={(event, value) => setRate(value ? value : 0)}/>
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