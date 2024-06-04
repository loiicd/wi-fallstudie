import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

interface EmptyRowProps {
  isEmpty: boolean
  columns?: number
}

const EmptyRow: FunctionComponent<EmptyRowProps> = ({ isEmpty, columns =3 }) => {
  return isEmpty ? (
    <TableRow >
      <TableCell colSpan={columns} sx={{ textAlign: 'center' }}>
        <Typography variant='body2' color='grey'>Keine Daten vorhanden</Typography>
      </TableCell>
    </TableRow>
  ) : null
}

export default EmptyRow