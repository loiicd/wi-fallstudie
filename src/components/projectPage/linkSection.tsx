import { Project } from '../../types/project'
import { FunctionComponent } from 'react'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { CardActionArea, CardContent, Grid } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BugReportIcon from '@mui/icons-material/BugReport';


interface LinkSectionProps {
  project: Project
}



const LinkSection: FunctionComponent<LinkSectionProps> = ({ project }) => {

  const links = [
    {id: "confluence", title: "Confluence", url: "https://lunchtracker187.atlassian.net/l/cp/BmzE1EG1", icon: "wiki"},
    {id: "jira", title: "Jira", url: "https://www.atlassian.com/de/software/jira", icon: "bug"},
  ]

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'wiki':
        return <AutoStoriesIcon />;
      case 'bug':
        return <BugReportIcon />;
      case 'Edit':
        return <EditIcon />;
      default:
        return <LinkIcon />;
    }
  }

  return (
    <Card sx={{ marginTop: 2}}>
      <List subheader={<ListSubheader>Links</ListSubheader>}>
        {project.id === "c3e1f17e-8184-4e5a-a84b-e0e8a6e45fe3" ? 
          <>
            {links.map((link) => (
              <ListItem>
              <Card sx={{width: '100%'}}>
                <CardActionArea onClick={() => window.location.href = link.url}>
                  <CardContent>
                  <Grid container sx={{ display:'flex', alignItems: 'center', justifyContent: 'flex-start'}} spacing={2}>
                    <Grid item>
                      {getIcon(link.icon)}
                    </Grid>
                    <Grid item sx={{marginRight: 1}}>
                      <Typography component="legend">{link.title}</Typography>
                    </Grid>
                  </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              </ListItem>
            ))}
          </>
        : 
          <ListItem>
            <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">Keine Links verfügbar</Alert>
          </ListItem>
        }
      </List>
    </Card>
  )
}

export default LinkSection