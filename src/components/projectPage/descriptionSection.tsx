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
        Beschreibungen
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Kurzbeschreibung</Typography>
            <Typography>{loading ? <Skeleton /> : project!.short_description? project!.short_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Ziel</Typography>
            <Typography>{loading ? <Skeleton /> : project!.target_description ? project!.target_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Vision</Typography>
            <Typography>{loading ? <Skeleton /> : project!.vision_description ? project!.vision_description : "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Problemstellung</Typography>
            <Typography>{loading ? <Skeleton /> : project!.problem_description ? project!.problem_description : "-"}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default DescriptionSection