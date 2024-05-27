import { FunctionComponent } from 'react'
import { Project } from '../types/project'
import { BarChart } from '@mui/x-charts/BarChart'

interface ProjectBarChartProps {
  projects: Project[]
  loading: boolean
}

const ProjectBarChart: FunctionComponent<ProjectBarChartProps> = ({ projects, loading }) => {
  const departments = projects.map(project => {
    const departmentSet = new Set<string>()
    if (project.department) {
      departmentSet.add(project.department)
    } else {
      departmentSet.add('Unbekannt')
    }
    return Array.from(departmentSet.values())
  })


  // const locationCounts: { label: string, data: number[] }[] = []

  // projects.forEach(project => {
  //   if (!project.location) {
  //     project.location = 'Unkown'
  //   }

  //   const index = locationCounts.findIndex(locationCounts => locationCounts.label === project.location)

  //   if (index !== -1) {
  //     locationCounts[index].data[0] += 1
  //   } else {
  //     locationCounts.push({ label: project.department, data: [1] })
  //   }

  // })

  return (
    <BarChart
      loading={loading}
      // xAxis={[{ scaleType: 'band', data: departmentCounts.map(departmentCount => departmentCount.label) }]}
      xAxis={[{ data: departments, scaleType: 'band' }]}
      // series={departmentCounts}
      series={[]}
      width={300}
      height={200}
    />
  )
}

export default ProjectBarChart