import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { FunctionComponent } from 'react'

interface MetricCardProps {
  label: string
  value: string
  icon: ReactNode
}

const MetricCard: FunctionComponent<MetricCardProps> = ({ label, value, icon }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>{label}</Typography>
            <Typography variant='h5' component='div'>{value}</Typography>
            <Typography variant='body2'>
              <TrendingUpIcon sx={{ color: 'green' }}/>
              20% Since last month
            </Typography>
          </Box>
          {icon}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MetricCard