import { DialogContent, Divider, Grid, Rating, Typography } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { FunctionComponent } from "react"
import { Project } from "../types/project"

interface ProjectDetailDialogProps {
  project: Project
  open: boolean,
  handleClose: () => void
}

const ProjectDetailDialog: FunctionComponent<ProjectDetailDialogProps> = ({ project, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle>Projekt: {project.title}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetailDialog