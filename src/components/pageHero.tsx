import { FunctionComponent, ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

interface PageHeroProps {
  title: string
  actions?: ReactNode
  loading?: boolean
}

const PageHero: FunctionComponent<PageHeroProps> = ({ title, actions, loading }) => {
  return (
    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='stretch' sx={{ marginBottom: 4 }}>
      {loading ? 
        <Skeleton>
          <Typography variant='h3'>Das hier ist ein Platzhalter Text</Typography>
        </Skeleton> 
        : 
        <Typography variant='h3'>{title}</Typography>
      }
      {actions}
    </Stack>
  )
}

export default PageHero