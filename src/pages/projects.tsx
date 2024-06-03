import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import ProjectsTable from '../components/projectsTable'
import StandardLayout from '../layout/StandardLayout'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <StandardLayout>
      <h1>Projekte</h1>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(event, value) => setActiveTab(value)}>
            <Tab label="All" value="all" />
            <Tab label="Eingereicht" value="eingereicht" disabled />
            <Tab label="Priorisierung" value="prio" disabled/>
          </TabList>
        </Box>
        <TabPanel value="all">
          <ProjectsTable />
        </TabPanel>
        <TabPanel value="eingereicht">Item Two</TabPanel>
        <TabPanel value="prio">Item Three</TabPanel>
      </TabContext>
    </StandardLayout>
  )
}

export default ProjectsPage