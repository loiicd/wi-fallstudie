import { Project, ProjectRate } from '../../types/project'
import { FunctionComponent } from 'react'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

type UserRateAvg = {
  user_id: string,
  firstname: string,
  lastname: string,
  avgRate: number
}

interface RateSectionProps {
  project: Project
}

const RateSection: FunctionComponent<RateSectionProps> = ({ project }) => {
  const avgPerUser: UserRateAvg[] = []

  project.rates.forEach((rate: ProjectRate) => {
    const userRate = avgPerUser.find(user => user.user_id === rate.user.id)
    if (userRate) {
      userRate.avgRate = (userRate.avgRate + rate.rate) / 2;
    } else {
      avgPerUser.push({
        user_id: rate.user.id,
        firstname: rate.user.firstname,
        lastname: rate.user.lastname,
        avgRate: rate.rate
      })
    }
  })

  return (
    <Card sx={{ marginTop: 2}}>
      <List subheader={<ListSubheader>Zusammengefasste Bewertungen</ListSubheader>}>
        {avgPerUser.map((rate) => (
          <ListItem>
            <Stack>
              <Typography component="legend">{rate.firstname} {rate.lastname}</Typography>
              <Rating value={rate.avgRate} readOnly />
            </Stack>
          </ListItem>
        ))}
        {project.rates.length === 0 ? 
          <ListItem>
            <Alert sx={{display: 'flex', width: '100%'}} icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">Es gibt derzeit keine Berwertungen</Alert>
          </ListItem>
          : 
          <ListItem>
            <Stack>
              <Typography component="legend">Durchschnitt</Typography>
              <Rating value={project.rates.reduce((sum, rate) => sum + rate.rate, 0) / project.rates.length} readOnly precision={0.1}/>
            </Stack>
          </ListItem>
        }
      </List>
    </Card>
  )
}

export default RateSection