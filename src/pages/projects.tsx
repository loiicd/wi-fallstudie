import ProjectsTable from '../components/projectsTable'
import StandardLayout from '../layout/StandardLayout'

const ProjectsPage = () => {
  return (
    <StandardLayout>
      <h1>Projekte</h1>
      <ProjectsTable />
    </StandardLayout>
  )
}

export default ProjectsPage