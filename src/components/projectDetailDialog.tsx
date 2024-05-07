import { DialogContent, Grid, Rating, Typography } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { FunctionComponent } from "react"

interface ProjectDetailDialogProps {
  project: any
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
      <DialogTitle>{project.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body1'>{project.projektLeiter}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Vision</Typography>
          </Grid>
          <Grid item xs={2}>
            <Rating />
          </Grid>
          <Grid item xs={10}>
            <Typography variant='body1'>{project.vision}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h5'>Problemstellung</Typography>
          </Grid>
          <Grid item xs={2}>
            <Rating />
          </Grid>
          <Grid item xs={10}>
            <Typography variant='body1'>{project.problemstellung}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h5'>Weitere Punkt XY</Typography>
          </Grid>
          <Grid item xs={2}>
            <Rating />
          </Grid>
          <Grid item xs={10}>
            <Typography variant='body1'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetailDialog