import { FunctionComponent } from 'react'
import { Project } from '../../types/project'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Grid } from '@mui/material'

interface DescriptionSectionProps {
  project?: Project
  loading: boolean
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({ project, loading }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontSize: '1rem' }} color="text.secondary" gutterBottom>Beschreibungen</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Kurzbeschreibung</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project!.short_description? project!.short_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Problemstellung</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project!.problem_description ? project!.problem_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Ziel</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project!.target_description ? project!.target_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Vision</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project!.vision_description ? project!.vision_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Stakeholder</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project?.stakeholder ? project?.stakeholder : '-'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Abhängigkeiten</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project?.dependencies ? project?.dependencies : '-'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Erwarteter Effekt</Typography>
            <Typography display="block" style={{ whiteSpace: 'pre-line' }}>{loading ? <Skeleton /> : project?.expected_effects ? project?.expected_effects : '-' }</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default DescriptionSection