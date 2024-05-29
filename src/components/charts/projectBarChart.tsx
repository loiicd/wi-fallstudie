import { FunctionComponent, useMemo } from 'react'
import { Project } from '../../types/project'
import { BarChart } from '@mui/x-charts/BarChart'

interface ProjectBarChartProps {
  projects: Project[]
  loading: boolean
  type: 'department' | 'location'
}

const ProjectBarChart: FunctionComponent<ProjectBarChartProps> = ({ projects, loading, type }) => {
  const dataByDepartment = useMemo(() => {
    const data: Record<string, number> = {}
    
    projects.forEach(project => {
      if(project.department) {
        if(!data[project.department]) {
          data[project.department] = 1
        } else {
          data[project.department] += 1
        }
      }
    })

    return data
  }, [projects])

  const dataByLocations = useMemo(() => {
    const data: Record<string, number> = {}
    
    projects.forEach(project => {
      if(project.location) {
        if(!data[project.location]) {
          data[project.location] = 1
        } else {
          data[project.location] += 1
        }
      }
    })

    return data
  }, [projects])

  return (
    <BarChart
      loading={loading}
      xAxis={[{ data: type === 'department' ? Object.keys(dataByDepartment) : Object.keys(dataByLocations), scaleType: 'band' }]}
      series={[{ data: type === 'department' ? Object.values(dataByDepartment) : Object.values(dataByLocations) }]}
      height={300}
    />
  )
}

export default ProjectBarChart