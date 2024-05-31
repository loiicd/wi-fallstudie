import { FunctionComponent } from 'react'
import { Project } from '../../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

interface BudgetSectionProps {
  project?: Project
}

const BudgetSection: FunctionComponent<BudgetSectionProps> = ({ project }) => {

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Budget</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant='h6'>FTE Intern</Typography>
            <Typography>{project?.fte_intern ? project?.fte_intern : '-'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>FTE Extern</Typography>
            <Typography>{project?.fte_extern ? project?.fte_extern : '-'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>Investitionen</Typography>
            <Typography>{project?.investment ? project?.investment : '-'}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BudgetSection