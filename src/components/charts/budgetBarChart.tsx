import { FunctionComponent, useState } from 'react'
import { Project } from '../../types/project'
import { BarChart } from '@mui/x-charts/BarChart'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

const transformProjectData = (projects: Project[]) =>  {
  const budgetData: { [key: string]: { [location: string]: number } } = {}

  projects.forEach(project => {
    if (project.budget) {
      project.budget.forEach(budgetItem => {
        const date = new Date(budgetItem.date || '')
        const month = date.toLocaleString('default', { month: 'short' })
        const yearMonth = `${month} ${date.getFullYear()}`

        if (!budgetData[yearMonth]) {
          budgetData[yearMonth] = {}
        }

        if (!budgetData[yearMonth][project.location || 'Unknown']) {
          budgetData[yearMonth][project.location || 'Unknown'] = 0
        }

        budgetData[yearMonth][project.location || 'Unknown'] += parseFloat(budgetItem.value)
      })
    }
  })
  return budgetData
}


type PieChartAttribute = 'projectsPerLocation' | 'projectsPerDepartment'

interface BudgetBarChartProps {
  projects: Project[]
  loading: boolean
}

const BudgetBarChart: FunctionComponent<BudgetBarChartProps> = ({ projects, loading }) => {
  const [attribute, setAttribute] = useState<PieChartAttribute>('projectsPerLocation')
  const data = transformProjectData(projects)

  console.log(data)

  const labels = Object.keys(data)
  const locations = Array.from(new Set(Object.values(data).flatMap(monthData => Object.keys(monthData))))

  const datasets = locations.map(location => ({
    label: location,
    data: labels.map(label => data[label][location] || 0),
  }))

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BarChart
        loading={loading}
        series={datasets.map(dataset => ({ label: dataset.label, data: dataset.data }))}
        xAxis={[{ data: labels, scaleType: 'band' }]}
        height={400}

      />
      <Typography sx={{ marginBottom: 2 }}>
        Budget pro 
        <FormControl variant='standard' size='small' sx={{ marginLeft: 1, display: 'inline-block' }}>
          <Select
            value={attribute}
            size='small' 
            onChange={(event) => setAttribute(event.target.value as PieChartAttribute)}
          >
            <MenuItem value={'projectsPerLocation'}>Standort</MenuItem>
            <MenuItem value={'projectsPerDepartment'}>Abteilung</MenuItem>
          </Select>
        </FormControl>
      </Typography>
    </Card>
  )
}

export default BudgetBarChart