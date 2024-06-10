import { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Project } from '../../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ProjectRessourceTable } from '../addProjectsDialog/ressourceTable'
import RateProvider from '../rateProvider'

interface BudgetSectionProps {
  project?: Project
  handleReloadProject: () => void
}

const BudgetSection: FunctionComponent<BudgetSectionProps> = ({ project, handleReloadProject }) => {
  const [tab, setTab] = useState<string>('1')

  const handleChangeTab = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  return (
    <Card>
      <CardContent>
        
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab}>
              <Tab label={'Personal Ressourcen (' + ((project?.ressources?.length || 0)) + ')' } value="1" />
              <Tab label={"Budget (" + ((project?.budget?.length || 0)) + ')'} value="2" />
              <Tab label={"Kompläxitätsfaktoren (" + ((project?.complexity?.length || 0)) + ')'} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {project ? 
              <ProjectRessourceTable type="ressource_ressource" project={project} column_labels={["Monat", "Bedarf", "FTE"]} editable={false} /> 
              : 
              null
              }
          </TabPanel>
          <TabPanel value="2">
            {project ? 
              <ProjectRessourceTable type="budget_ressource" project={project} column_labels={["Monat", "Beschreibung", "EUR"]} editable={false} /> 
              : 
                null
              }
          </TabPanel>
          <TabPanel value="3">
            {project ? 
              <ProjectRessourceTable type="complexity_ressource" project={project} column_labels={["Kategorie", "Komplexitätsgrad"]} editable={false} /> 
              : 
                null
              }
          </TabPanel>
        </TabContext>
      </CardContent>
      {tab === '1' ? <RateProvider section='personal_ressources' project={project} handleReloadProject={handleReloadProject} /> : null}
      {tab === '2' ? <RateProvider section='budget' project={project} handleReloadProject={handleReloadProject} /> : null}
      {tab === '3' ? <RateProvider section='complexity' project={project} handleReloadProject={handleReloadProject} /> : null}
    </Card>
  )
}

export default BudgetSection