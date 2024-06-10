import { FunctionComponent } from 'react'
import { ProjectStatus } from '../../types/project'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

interface StatusSectionProps {
  projectStatus?: ProjectStatus
}

const StatusSection: FunctionComponent<StatusSectionProps> = ({ projectStatus }) => {
  let activeStep: number

  switch (projectStatus) {
    case 'Eingereicht':
      activeStep = 1
      break
    case 'In Prüfung':
      activeStep = 2
      break
    case 'Angenommen':
      activeStep = 3
      break
    case 'Abgelehnt':
      activeStep = 3
      break
    default:
      activeStep = 0
      break
  }

  return (
    <Stepper alternativeLabel sx={{ marginBottom: 4 }} activeStep={activeStep}>
      <Step>
        <StepLabel>Entwurf</StepLabel>
      </Step>
      <Step>
        <StepLabel>Eingereicht</StepLabel>
      </Step>
      <Step>
        <StepLabel>In Prüfung</StepLabel>
      </Step>
      <Step>
        <StepLabel>Geprüft</StepLabel>
      </Step>
    </Stepper>
  )
}

export default StatusSection