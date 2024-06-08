import { FunctionComponent, useState } from 'react'
import { Project } from '../../types/project'
import { PieChart } from '@mui/x-charts/PieChart'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

type PieChartAttribute = 'projectsPerLocation' | 'projectsPerDepartment'

interface ProjectPieChartProps {
  projects: Project[]
  loading: boolean
}

const ProjectPieChart: FunctionComponent<ProjectPieChartProps> = ({ projects, loading }) => {
  const [attribute, setAttribute] = useState<PieChartAttribute>('projectsPerLocation')

  const locationCount = projects.reduce((acc, project) => {
    const location = project.location || 'Unknown'
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  const departmentCount = projects.reduce((acc, project) => {
    const department = project.department || 'Unknown'
    acc[department] = (acc[department] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  const locationPieChartData = Object.entries(locationCount).map(([label, value], id) => ({id, value, label}))
  const departmentPieChartData = Object.entries(departmentCount).map(([label, value], id) => ({id, value, label}))

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart
        series={[
          {
            data: attribute === 'projectsPerDepartment' ? departmentPieChartData : locationPieChartData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        loading={loading}
        width={400}
        height={200}
      />
      <Box marginBottom={2}>
        <FormControl variant='standard' size='small' fullWidth>
          <Select
            value={attribute}
            size='small' 
            onChange={(event) => setAttribute(event.target.value as PieChartAttribute)}
          >
            <MenuItem value={'projectsPerLocation'}>Standort</MenuItem>
            <MenuItem value={'projectsPerDepartment'}>Abteilung</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Card>
  )
}

export default ProjectPieChart