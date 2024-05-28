import { Project } from '../../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

interface DescriptionSectionProps {
  project?: Project
  loading: boolean
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({ project, loading }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>Beschreibungen</Typography>
        <Typography variant='h6'>Kurzbeschreibung</Typography>
        <Typography>{loading ? <Skeleton /> : project!.short_description}</Typography>
        <Typography variant='h6'>Ziel</Typography>
        <Typography>{loading ? <Skeleton /> : project!.target_description}</Typography>
        <Typography variant='h6'>Vision</Typography>
        <Typography>{loading ? <Skeleton /> : project!.vision_description}</Typography>
        <Typography variant='h6'>Problemstellung</Typography>
        <Typography>{loading ? <Skeleton /> : project!.problem_description}</Typography>
      </CardContent>
    </Card>
  )
}

export default DescriptionSection