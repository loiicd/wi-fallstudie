import { FunctionComponent } from 'react'
import { projectTypes } from '../../types/project'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

const StatusSection: FunctionComponent = () => {
  return (
    <Stepper sx={{ marginBottom: 4 }}>
      {projectTypes.map(projectType => (
        <Step>
          <StepLabel>{projectType}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default StatusSection