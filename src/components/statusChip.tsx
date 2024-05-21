import React from 'react'
import { Chip } from '@mui/material'

import DraftsIcon from '@mui/icons-material/Drafts'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import UpdateIcon from '@mui/icons-material/Update'
import VerifiedIcon from '@mui/icons-material/Verified'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'

interface StatusChipProps {
  value: string
}

const StatusChip: React.FC<StatusChipProps> = ({ value }) => {
  switch(value) {
    case 'Entwurf': return (<Chip variant='outlined' icon={<DraftsIcon />} label={value} color="default" size='small' />)
    case 'Eingereicht': return (<Chip variant='outlined' icon={<MoveToInboxIcon />} label={value} color="default" size='small' />)
    case 'In Prüfung': return (<Chip variant='outlined' icon={<UpdateIcon />} label={value} color="warning" size='small' />)
    case 'Angenommen': return (<Chip variant='outlined' icon={<VerifiedIcon />} label={value} color="success" size='small' />)
    case 'Abgelehnt': return (<Chip variant='outlined' icon={<DoNotDisturbOnIcon />} label={value} color="error" size='small' />)
    default: return null
  }
}

export default StatusChip