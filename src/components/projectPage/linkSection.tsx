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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


interface LinkSectionProps {
  project: Project
}



const LinkSection: FunctionComponent<LinkSectionProps> = ({ project }) => {

  return (
    <Card sx={{ marginTop: 2}}>
      <List subheader={<ListSubheader>Links</ListSubheader>}>
        {project.links && project.links.length > 0 ?
          <>
            {project.links.map((link) => (
              <ListItem>
              <Card sx={{width: '100%'}}>
                <CardActionArea onClick={() => window.location.href = link.url}>
                  <CardContent>
                  <Grid container sx={{ display:'flex', alignItems: 'center', justifyContent: 'flex-start'}} spacing={2}>
                    <Grid item>
                      < OpenInNewIcon />
                    </Grid>
                    <Grid item sx={{marginRight: 1}}>
                      {link.type === 'confluence' || link.type === 'jira'? 
                        <Typography component="legend">{link.type.charAt(0).toUpperCase() + link.type.slice(1)}</Typography> 
                      : 
                        <Typography component="legend">{link.url.slice(0,10) + '..'}</Typography>
                      }
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
            <Alert  sx={{display: 'flex', width: '100%'}} icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">Keine Links verfügbar</Alert>
          </ListItem>
        }
      </List>
    </Card>
  )
}

export default LinkSection