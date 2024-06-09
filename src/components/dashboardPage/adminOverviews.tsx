import Box from '@mui/material/Box'
import RoleProvider from '../RoleProvider'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import CircleIcon from '@mui/icons-material/Circle'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const AdminOverview = () => {
  const days = ['green', 'red', 'green', 'green', 'green', 'green', 'orange', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']
  const days2 = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'red', 'orange']

  return (
    <RoleProvider roles={['administrator']} type='include'>
      <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
        <Typography variant='h4' color='green'>All Systems operational</Typography>
        <Stack gap={4} marginTop={4}>
          <Divider sx={{ width: '600px' }} />
          <Card sx={{ width: '600px'}}>
            <CardContent>
              <Stack direction='row' justifyContent='space-between'>
                <Typography variant='body1'>Success Rate</Typography>
                <Chip size='small' icon={<CircleIcon color='success' />} label='Operational' />
              </Stack>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Typography variant='body2' color='gray'>Uptime</Typography>
                <Typography variant='body2' color='gray'>98.9% - No current issue</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" marginTop={1}>
                {days.map(day => (
                  <Box
                    flexBasis='stretch'
                    width={10}
                    height={50}
                    borderRadius={20}
                    bgcolor={day}
                    sx={{ opacity: 0.7 }}
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Stack alignItems="center" direction="row" gap={1}>
                  <KeyboardArrowLeftIcon sx={{ color: 'gray' }} />
                  <Typography variant="body2" color='gray'>30 days ago</Typography>
                </Stack>
                <Typography variant='body2' color='gray'>Today</Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ width: '600px'}}>
            <CardContent>
              <Stack direction='row' justifyContent='space-between'>
                <Typography variant='body1'>Response Time</Typography>
                <Chip size='small' icon={<CircleIcon color='success' />} label='Operational' />
              </Stack>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Typography variant='body2' color='gray'>Uptime</Typography>
                <Typography variant='body2' color='gray'>1.14 sn - No current issue</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" marginTop={1}>
                {days2.map(day => (
                  <Box
                    flexBasis='stretch'
                    width={10}
                    height={50}
                    borderRadius={20}
                    bgcolor={day}
                    sx={{ opacity: 0.7 }}
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Stack alignItems="center" direction="row" gap={1}>
                  <KeyboardArrowLeftIcon sx={{ color: 'gray' }} />
                  <Typography variant="body2" color='gray'>30 days ago</Typography>
                </Stack>
                <Typography variant='body2' color='gray'>Today</Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </RoleProvider>
  )
}

export default AdminOverview