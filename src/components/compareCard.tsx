import { useNavigate } from 'react-router-dom'
import { Project } from '../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Rating from '@mui/material/Rating'
import { FunctionComponent } from 'react'

interface CompareSectionProps {
  items: { label: string, value?: any }[]
}

const CompareSection: FunctionComponent<CompareSectionProps> = ({ items }) => {
  return (
    <>
      <Divider sx={{ margin: 2 }} />
      {items.map((item) => (
        <>
          <Typography variant='overline'>{item.label}</Typography>
          <Typography variant='h6'>{item.value ? item.value : '-'}</Typography>  
        </>
      ))}
    </>
  )
}

interface CompareCardProps {
  project: Project
}

const CompareCard: FunctionComponent<CompareCardProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ marginTop: 4, position: 'relative' }}>
      <IconButton sx={{ position: 'absolute', right: 0, margin: 1 }} onClick={() => navigate(`/project/${project.id}`)}><OpenInNewIcon /></IconButton>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6'>{project.title}</Typography>

        <CompareSection items={[
          { label: 'Abteilung', value: project.department },
          { label: 'Standort', value: project.location }
        ]} />

        <CompareSection items={[
          { label: 'Startdatum', value: project.start_date ? new Date(project.start_date).toLocaleDateString() : undefined },
          { label: 'Enddatum', value: project.end_date ? new Date(project.end_date).toLocaleDateString() : undefined }
        ]} />

        <CompareSection items={[
          { label: 'Projektleiter', value: project.project_lead ? `${project.project_lead.firstname} ${project.project_lead.lastname}` : undefined },
          { label: 'Stellv. Projektleiter', value: project.sub_project_lead ? `${project.sub_project_lead.firstname} ${project.sub_project_lead.lastname}` : undefined }
        ]} />

        <Divider sx={{ margin: 2 }} />
        <Rating value={project.rates.reduce((sum, rate) => sum + rate.rate, 0) / project.rates.length} readOnly precision={0.1} />
      </CardContent>
    </Card>
  )
}

export default CompareCard