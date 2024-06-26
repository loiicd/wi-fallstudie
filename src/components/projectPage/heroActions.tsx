import { FunctionComponent, useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { ApiResponse } from '../../types/apiResponse'
import { Project } from '../../types/project'
import { useNavigate } from 'react-router-dom'
import { updateProject } from '../../services/projects'
import { useSnackbar } from 'notistack'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import GavelIcon from '@mui/icons-material/Gavel'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import LoadingButton from '@mui/lab/LoadingButton'

interface HeroActionsProps {
  project: ApiResponse<Project>
  handleDelete: () => void
  handleOpenAddProjectDialog: () => void
  handleOpenRateProjectDialog: () => void
  handleOpenEvaluateDialog: () => void
  handleOpenPrioDialog: () => void
}

const HeroActions: FunctionComponent<HeroActionsProps> = ({ project, handleDelete, handleOpenAddProjectDialog, handleOpenEvaluateDialog, handleOpenPrioDialog }) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { activeUser } = useContext(UserContext)

  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false)

  const projectPrüfenNotAllowed = activeUser?.type !== 'administrator' && activeUser?.type !== 'controller' && activeUser?.type !== 'geschäftsleitung'
  const projectEditNotAllowed = activeUser?.type !== 'administrator' && activeUser?.type !== 'controller' && (project.state === 'success' && activeUser?.id !== project.data.created_from)

  const handleSetInAudit = () => {
    if (project.state === 'success') {
      setIsUpdatingStatus(true)
      updateProject({ ...project.data, status: 'In Prüfung' })
        .then(() => enqueueSnackbar('Status In Prüfung gesetzt', { variant: 'success' }))
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
        .finally(() => setIsUpdatingStatus(false))
    }
  }

  return (
    <Stack direction='row' gap={2} alignItems='center'>
      <ButtonGroup variant='outlined' disabled={project.state !== 'success' || projectPrüfenNotAllowed || project.data.status !== 'Eingereicht' }>
        <LoadingButton loading={isUpdatingStatus} onClick={handleSetInAudit}>In Prüfung setzen</LoadingButton>
      </ButtonGroup>
      <ButtonGroup variant='contained'>
        <Tooltip title='Projekt Priorisieren'>
          <Button 
            disabled={project.state !== 'success' || projectPrüfenNotAllowed} 
            onClick={handleOpenPrioDialog}
          >
            <PriorityHighIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Projekt Prüfen'>
          <Button 
            disabled={project.state !== 'success' || projectPrüfenNotAllowed} 
            onClick={handleOpenEvaluateDialog}
          >
            <GavelIcon />
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
      <ButtonGroup variant='contained' disabled={projectEditNotAllowed}>
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

export default HeroActions