import { FunctionComponent, SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import { Project, ProjectRateSection } from '../types/project'
import { postProjectRate } from '../services/projectRate'
import { useSnackbar } from 'notistack'
import { UserContext } from '../context/userContext'
import Grow from '@mui/material/Grow'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import Divider from '@mui/material/Divider'
import StarBorderIcon from '@mui/icons-material/StarBorder'

interface RateProviderProps {
  section: ProjectRateSection
  handleReloadProject: () => void
  project?: Project
}

const RateProvider: FunctionComponent<RateProviderProps> = ({ project, section, handleReloadProject }) => {
  const { activeUser } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()

  const [openRating, setOpenRating] = useState<boolean>(false)
  const [newRating, setNewRating] = useState<number | null>(null)
  const [emptyRateError, setEmptyRateError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingRating, setLoadingRating] = useState<number | null>(null)

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const sectionRates =  project?.rates.filter(rate => rate.section === section)
  const avgRate = sectionRates?.length ? sectionRates.reduce((sum, { rate }) => sum + rate, 0) / sectionRates.length : null

  useEffect(() => {
    if (!newRating) {
      const activeUserRate = sectionRates?.find(rate => rate.user.id === activeUser?.id)?.rate || null
      setNewRating(activeUserRate)
    }
  }, [activeUser, sectionRates, newRating])

  useEffect(() => {
    if (loading) {
      intervalIdRef.current = setInterval(() => {
        setLoadingRating(prevRating => {
          if (prevRating === null) return newRating
          return null
        })
      }, 300)
    } else {
      clearInterval(intervalIdRef.current!)
    }

    return () => clearInterval(intervalIdRef.current!)
  }, [loading, newRating])

  const handleOpenRating = () => {
    setOpenRating(true)
  }

  const handleCloseRating = () => {
    setEmptyRateError(false)
    setOpenRating(false)
  }

  const handleChangeRating = (event: SyntheticEvent<Element, Event>, value: number | null) => {
    setNewRating(value)
  }

  const handleSubmitRating = () => {
    if (project && activeUser) {
      if (newRating) {
        setLoading(true)
        postProjectRate(project.id, activeUser.id, newRating, section)
          .then(() => {
            handleCloseRating()
            handleReloadProject()
            enqueueSnackbar('Rating gespeichert', { variant: 'success'})
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error'}))
          .finally(() => setLoading(false))
      } else {
        setEmptyRateError(true)
      }
    }
  }

  return (
    <Stack 
      gap={1} 
      direction='row' 
      alignItems='center' 
      justifyContent='flex-end'
      sx={{ marginRight: 1 }}
    >
      <Grow in={openRating}>
      {loading ? 
        <Rating 
          value={loadingRating} 
          precision={1} 
          readOnly
        />
        :
        <Rating 
          value={newRating} 
          onChange={handleChangeRating} 
          precision={1} 
          emptyIcon={
            emptyRateError ? <StarBorderIcon fontSize='inherit' sx={{ color: 'red' }} /> : undefined
          }
        />
      }
      </Grow>
      <Grow in={openRating}>
        <IconButton onClick={handleCloseRating}>
          <CloseIcon />
        </IconButton>
      </Grow>
      <Grow in={openRating}>
        <IconButton onClick={handleSubmitRating}>
          <CheckIcon />
        </IconButton>
      </Grow>
      <Grow in={openRating}>
        <Divider orientation='vertical' sx={{ marginY: 1 }} flexItem />
      </Grow>
      <IconButton disabled={project && !openRating ? false : true} onClick={handleOpenRating}>
        <ThumbsUpDownIcon />
      </IconButton>
      <Divider orientation='vertical' sx={{ marginY: 1 }} flexItem />
      <Rating value={avgRate} readOnly precision={0.1} />
    </Stack>
  )
}

export default RateProvider