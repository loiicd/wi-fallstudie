import { FunctionComponent } from 'react'
import { Project } from '../../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import RateProvider from '../rateProvider'

interface GeneralSectionProps {
  project?: Project
  loading: boolean
  handleReloadProject: () => void
}

const GeneralSection: FunctionComponent<GeneralSectionProps> = ({ project, loading, handleReloadProject }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='h6'>Abteilung</Typography>
              <Typography>{loading ? <Skeleton /> : project!.department ? project!.department : "-"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Standort</Typography>
              <Typography>{loading ? <Skeleton /> : project!.location ? project!.location : "-"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Startdatum</Typography>
              <Typography>{loading ? <Skeleton /> : project!.start_date ? new Date(project!.start_date).toLocaleDateString() : '-'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Enddatum</Typography>
              <Typography>{loading ? <Skeleton /> : project!.end_date ? new Date(project!.end_date).toLocaleDateString() : '-'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Erstellt von</Typography>
              <Typography>{loading ? <Skeleton /> : project!.created_from_user ? `${project!.created_from_user.firstname} ${project!.created_from_user?.lastname}` : '-'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Erstellt am</Typography>
              <Typography>{loading ? <Skeleton /> : project!.created_at ? new Date(project!.created_at).toLocaleDateString() : '-'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <RateProvider section='general' project={project} handleReloadProject={handleReloadProject} />
      </Card>
    </>
  )
}

export default GeneralSection