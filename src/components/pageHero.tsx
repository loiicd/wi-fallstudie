import { Skeleton, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { FunctionComponent } from 'react'

interface PageHeroProps {
  title: string
  loading?: boolean
}

const PageHero: FunctionComponent<PageHeroProps> = ({ title, loading }) => {
  return (
    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='stretch' sx={{ marginBottom: 4 }}>
      {loading ? 
        <Skeleton>
          <Typography variant='h3'>Das hier ist ein Platzhalter Text</Typography>
        </Skeleton> 
        : <Typography variant='h3'>{title}</Typography>
      }
      <div>Test</div>
    </Stack>
  )
}

export default PageHero