import { FunctionComponent, useEffect, useState } from 'react'
import { ApiResponse } from '../../types/apiResponse'
import { Project } from '../../types/project'
import { useNavigate } from 'react-router-dom'
import { ProjectRole, User } from '../../types/user'
import Cookies from 'js-cookie'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeIcon from '@mui/icons-material/Mode'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

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
      <ButtonGroup variant='contained' disabled={project.state !== 'success' || project.data.created_from !== activeUser?.id || activeUser.type === 'administrator' || activeUser.type === 'controller'}>
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