import { LineChart } from '@mui/x-charts/LineChart'
import { Project } from '../../types/project'
import { FunctionComponent, useMemo } from 'react'
import dayjs from 'dayjs'

interface ProjectChartProps {
  projects: Project[]
  loading: boolean
}

const ProjectChart: FunctionComponent<ProjectChartProps> = ({ projects, loading }) => {

  const timeData = useMemo(() => {
    let earliestDate = dayjs().endOf('year')
    let latestDate = dayjs().startOf('year')

    projects.forEach(project => {
      const createdAt = dayjs(project.created_at)
      if (createdAt.isBefore(earliestDate)) {
        earliestDate = createdAt
      }
      if (createdAt.isAfter(latestDate)) {
        latestDate = createdAt
      }
    })

    const projectCountByMonth: { [key: string]: number } = {}

    let currentDate = earliestDate.startOf('month')

    while (currentDate.isBefore(latestDate) || currentDate.isSame(latestDate)) {
      const formattedMonth = currentDate.locale('de').format('MMMM YYYY')
      projectCountByMonth[formattedMonth] = 0
      currentDate = currentDate.add(1, 'month')
    }

    projects.forEach(project => {
      const projectMonth = dayjs(project.created_at).locale('de').format('MMMM YYYY')
      if (projectCountByMonth[projectMonth] !== undefined) {
        projectCountByMonth[projectMonth]++
      }
    })

    return projectCountByMonth
  }, [projects])

  return (
    <LineChart
      loading={loading}
      height={300}
      series={[{ data: Object.values(timeData) }]}
      xAxis={[{ scaleType: 'point', data: Object.keys(timeData) }]}
    />
  )
}

export default ProjectChart