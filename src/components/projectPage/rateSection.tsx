import { Project } from '../../types/project'
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

interface RateSectionProps {
  project: Project
}

const RateSection: FunctionComponent<RateSectionProps> = ({ project }) => {
  return (
    <Card sx={{ marginTop: 2}}>
      <List subheader={<ListSubheader>Bewertungen</ListSubheader>}>
        {project.rates.map((rate) => (
          <ListItem>
            <Stack>
              <Typography component="legend">{rate.user.firstname} {rate.user.lastname}</Typography>
              <Rating value={rate.rate} readOnly />
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