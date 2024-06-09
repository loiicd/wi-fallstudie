import { FunctionComponent } from 'react'
import { Project } from '../../types/project'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Tooltip from '@mui/material/Tooltip'

interface RolesSectionProps {
  project: Project
}

const RolesSection: FunctionComponent<RolesSectionProps> = ({ project }) => {
  const project_lead_initials = project.project_lead ? project.project_lead.firstname[0] + project.project_lead.lastname[0] : '?'
  const project_lead_name = project.project_lead ? `${project.project_lead?.firstname} ${project.project_lead?.lastname}` : 'Nicht definiert'

  const sub_project_lead_initials = project.sub_project_lead ? project.sub_project_lead.firstname[0] + project.sub_project_lead.lastname[0] : '?'
  const sub_project_lead_name = project.sub_project_lead ? `${project.sub_project_lead?.firstname} ${project.sub_project_lead?.lastname}` : 'Nicht definiert'

  const auftraggeber_initials = project.auftraggeber ?  project.auftraggeber.firstname[0] + project.auftraggeber.lastname[0] : '?'
  const auftraggeber_name = project.auftraggeber ? `${project.auftraggeber?.firstname} ${project.auftraggeber?.lastname}` : 'Nicht definiert'

  return (
    <Card>
      <List subheader={<ListSubheader>Projektleiter</ListSubheader>}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{project_lead_initials}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={project_lead_name} secondary={project.project_lead?.email} />
        </ListItem>
        
        <ListSubheader component="div">Stellv. Projektleiter</ListSubheader>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{sub_project_lead_initials}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={sub_project_lead_name} secondary={project.sub_project_lead?.email} />
        </ListItem>
        
        <ListSubheader component="div">Projektteam</ListSubheader>
        <ListItem>
          <AvatarGroup max={6}>
            {project.team.length !==0 ? 
              project.team.map(teamUser => (
                <Tooltip title={`${teamUser.firstname} ${teamUser.lastname}`}>
                  <Avatar>{teamUser.firstname[0]}{teamUser.lastname[0]}</Avatar>
                </Tooltip>
              ))
            :
              <Avatar>?</Avatar>
            }
          </AvatarGroup>
        </ListItem>

        <ListSubheader component="div">Auftraggeber</ListSubheader>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{auftraggeber_initials}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={auftraggeber_name} secondary={project.auftraggeber?.email} />
        </ListItem>
      </List>
    </Card>
  )
}

export default RolesSection