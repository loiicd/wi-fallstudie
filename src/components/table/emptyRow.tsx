import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

interface EmptyRowProps {
  isEmpty: boolean
}

const EmptyRow: FunctionComponent<EmptyRowProps> = ({ isEmpty }) => {
  return isEmpty ? (
    <TableRow >
      <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
        <Typography variant='body2' color='grey'>Keine Daten vorhanden</Typography>
      </TableCell>
    </TableRow>
  ) : null
}

export default EmptyRow