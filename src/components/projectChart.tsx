import { LineChart } from '@mui/x-charts/LineChart'
import { Project } from '../types/project'
import { FunctionComponent } from 'react'

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490]
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

interface ProjectChartProps {
  projects: Project[]
  loading: boolean
}

const ProjectChart: FunctionComponent<ProjectChartProps> = ({ projects, loading }) => {

  const test = projects.map(project => project.created_at)

  return (
    <LineChart
      loading={loading}
      width={300}
      height={200}
      series={[{ data: pData, label: 'Test' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  )
}

export default ProjectChart