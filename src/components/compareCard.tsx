import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Project } from '../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Rating from '@mui/material/Rating'
import ProjectRessourceGeneric from '../types/projectResourceGeneric'

interface CompareSectionProps {
  items: { label: string, value?: any }[]
}

const CompareSection: FunctionComponent<CompareSectionProps> = ({ items }) => {
  return (
    <>
      <Divider sx={{ margin: 1 }} />
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

  const calculateDuration = (start_date?: string, end_date?: string) => {
    if (!start_date || !end_date) return '-'
    const startDate = new Date(start_date)
    const endDate = new Date(end_date)
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear()
    const monthsDifference = endDate.getMonth() - startDate.getMonth()
    const totalMonthsDifference = yearsDifference * 12 + monthsDifference
    return `${totalMonthsDifference} Monate`
  }

  const calculateRessourceSum = (ressources?: ProjectRessourceGeneric[]) => {
    if (!ressources || ressources.length === 0) return undefined
    let sum: number = 0
    ressources.forEach(item => {
      sum = sum + Number(item.value)
    })
    return sum
  }

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
          { 
            label: 'Zeitraum', 
            value: `${project.start_date ? new Date(project.start_date).toLocaleDateString() : '?'} - ${project.end_date ? new Date(project.end_date).toLocaleDateString() : '?'}`
          }, { 
            label: 'Länge', 
            value: calculateDuration(project.start_date, project.end_date) 
          }
        ]} />

        <CompareSection items={[
          { label: 'Projektleiter', value: project.project_lead ? `${project.project_lead.firstname} ${project.project_lead.lastname}` : undefined },
          { label: 'Stellv. Projektleiter', value: project.sub_project_lead ? `${project.sub_project_lead.firstname} ${project.sub_project_lead.lastname}` : undefined }
        ]} />

        <CompareSection items={[
          { label: 'Personalressourcen', value: calculateRessourceSum(project.ressources) },
          { label: 'Budget', value: calculateRessourceSum(project.budget) },
          { label: 'Komplexität', value: calculateRessourceSum(project.complexity) },
        ]} />

        <Divider sx={{ margin: 2 }} />
        <Rating value={project.rates.reduce((sum, rate) => sum + rate.rate, 0) / project.rates.length} readOnly precision={0.1} />
      </CardContent>
    </Card>
  )
}

export default CompareCard