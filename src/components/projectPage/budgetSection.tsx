import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react'
import { Project } from '../../types/project'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ProjectRessourceTable } from '../addProjectsDialog/ressourceTable'

interface BudgetSectionProps {
  project?: Project
}

const BudgetSection: FunctionComponent<BudgetSectionProps> = ({ project }) => {
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
              <ProjectRessourceTable type="personal_ressource" project={project} column_labels={["Monat", "Name", "Stunden"]} editable={false} /> 
              : 
              null
              }
          </TabPanel>
          <TabPanel value="2">
            {project ? 
              <ProjectRessourceTable type="budget_ressource" project={project} column_labels={["Monat", "Kategorie", "Betrag"]} editable={false} /> 
              : 
                null
              }
          </TabPanel>
          <TabPanel value="3">
            {project ? 
              <ProjectRessourceTable type="complexity_ressource" project={project} column_labels={["Kategorie", "Komplexität"]} editable={false} /> 
              : 
                null
              }
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default BudgetSection