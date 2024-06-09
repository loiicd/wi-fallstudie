import { FunctionComponent, useState } from 'react'
import { Project } from '../../types/project'
import { BarChart } from '@mui/x-charts/BarChart'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

const transformProjectDataLocation = (projects: Project[]) =>  {
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

const transformProjectDataDepartment = (projects: Project[]) =>  {
  const budgetData: { [key: string]: { [department: string]: number } } = {}

  projects.forEach(project => {
    if (project.budget) {
      project.budget.forEach(budgetItem => {
        const date = new Date(budgetItem.date || '')
        const month = date.toLocaleString('default', { month: 'short' })
        const yearMonth = `${month} ${date.getFullYear()}`

        if (!budgetData[yearMonth]) {
          budgetData[yearMonth] = {}
        }

        if (!budgetData[yearMonth][project.department || 'Unknown']) {
          budgetData[yearMonth][project.department || 'Unknown'] = 0
        }

        budgetData[yearMonth][project.department || 'Unknown'] += parseFloat(budgetItem.value)
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
  const locationData = transformProjectDataLocation(projects)
  const departmentData = transformProjectDataDepartment(projects)

  const labels = Object.keys(locationData)
  const locations = Array.from(new Set(Object.values(locationData).flatMap(monthData => Object.keys(monthData))))
  const departments = Array.from(new Set(Object.values(departmentData).flatMap(monthData => Object.keys(monthData))))

  const locationDatasets = locations.map(location => ({
    label: location,
    data: labels.map(label => locationData[label][location] || 0),
  }))

  const departmentDatasets = departments.map(department => ({
    label: department,
    data: labels.map(label => departmentData[label][department] || 0),
  }))

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BarChart
        loading={loading}
        series={(attribute === 'projectsPerLocation' ? locationDatasets : departmentDatasets).map(dataset => ({ label: dataset.label, data: dataset.data }))}
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