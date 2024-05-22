import { Button, ButtonGroup, DialogContent, Divider, Grid, MenuItem, Rating, Select, Typography } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { FunctionComponent } from "react"
import { Project } from "../types/project"
import RoleProvider from "./RoleProvider"
import { postProject, updateProject } from "../services/projects"

interface ProjectDetailDialogProps {
  project: Project
  open: boolean,
  handleClose: () => void
}

const ProjectDetailDialog: FunctionComponent<ProjectDetailDialogProps> = ({ project, open, handleClose }) => {

  const handleDeletePress = (project: Project) => {
    handleClose()
    alert("Löschen: " + project.title as string)
  }

  const handleEditPress = (project: Project) => {
    new Promise<void>(() => {
      project.title += ' (EDITED)'
      console.log(project.title)
      updateProject(project)
    }).then(() => handleClose())
    .finally(() => console.log('Edited Success'))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      {/**
       * TODO: Implement Buttons as component to be reusable
       */}
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={8}>
          <DialogTitle>Projekt: {project.title}</DialogTitle>
        </Grid>
        <Grid item xs={4} justifyContent={"flex-end"}>
          <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
            <ButtonGroup>
              <RoleProvider roles={['projektmanager', 'administrator']} type='include'>
                <Button onClick={() => handleDeletePress(project)}>Löschen</Button>
              </RoleProvider>
              <Button onClick={() => handleEditPress(project)}>Bearbeiten</Button>
            </ButtonGroup>
          </RoleProvider>
        </Grid>
      </Grid>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6" color='dimgrey'>Projektleiter</Typography>
            <Typography variant="body1">{project.project_lead?.firstname} {project.project_lead?.lastname}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" color='dimgrey'>Stellv. Projektleiter</Typography>
            <Typography variant="body1">{project.sub_project_lead?.firstname} {project.sub_project_lead?.lastname}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" color='dimgrey'>Startdatum</Typography>
            <Typography variant="body1">{project.start_date ? new Date(project.start_date).toLocaleDateString() : null}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" color='dimgrey'>Enddatum</Typography>
            <Typography variant="body1">{project.end_date ? new Date(project.end_date).toLocaleDateString() : null}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6" color='dimgrey'>Projektteam</Typography>
          </Grid>
          <Grid item xs={9}>
            {project.team.map((user) => (
              <Typography variant="body1">{user.firstname} {user.lastname}</Typography>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Grid container spacing={2}>
          {project.short_description ? 
            <>
              <Grid item xs={2} />
              <Grid item xs={10}>
                <Typography variant='h6'>Kurzbeschreibung</Typography>
              </Grid>
              <Grid item xs={2}>
                <Rating />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='body1'>{project.short_description}</Typography>
              </Grid>
            </>
          : null} 

          {project.target_description ? 
            <>
              <Grid item xs={2} />
              <Grid item xs={10}>
                <Typography variant='h6'>Zielbeschreibung</Typography>
              </Grid>
              <Grid item xs={2}>
                <Rating />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='body1'>{project.target_description}</Typography>
              </Grid>
            </>
          : null}

          {project.vision_description ? 
            <>
              <Grid item xs={2} />
              <Grid item xs={10}>
                <Typography variant='h6'>Vision</Typography>
              </Grid>
              <Grid item xs={2}>
                <Rating />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='body1'>{project.vision_description}</Typography>
              </Grid>
            </>  
          : null}

          {project.problem_description ? 
            <>
              <Grid item xs={2} />
              <Grid item xs={10}>
                <Typography variant='h6'>Problemstellung</Typography>
              </Grid>
              <Grid item xs={2}>
                <Rating />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='body1'>{project.problem_description}</Typography>
              </Grid>
            </>
          : null}

          {!project.short_description && !project.target_description && !project.vision_description && !project.problem_description ? <Typography variant='body1'>Keine Beschreibungen verfügbar</Typography> : null}
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Select 
              label='Feld 2' 
              size='small' 
              value={project.status}
              sx={{ width: '100%'}} 
              // onChange={(event: SelectChangeEvent<string>) => handleStatusChange(event)}
            >
              <MenuItem value='Entwurf'>Entwurf</MenuItem>
              <MenuItem value='Eingereicht'>Eingereicht</MenuItem>
              <MenuItem value='In Prüfung'>In Prüfung</MenuItem>
              <MenuItem value='Angenommen'>Angenommen</MenuItem>
              <MenuItem value='Abgelehnt'>Abgelehnt</MenuItem>
             </Select>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetailDialog