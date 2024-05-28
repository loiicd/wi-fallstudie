import { FunctionComponent } from 'react'
import Skeleton from '@mui/material/Skeleton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface LoadingRowProps {
  cellCount: number
  loading: boolean
}

const LoadingRow: FunctionComponent<LoadingRowProps> = ({ cellCount, loading }) => {
  const numbers = [1, 2, 3, 4, 5]

  return loading ? (
    <>
      {numbers.map(() => (
        <TableRow>
          {Array.from({ length: cellCount }, (_, index) => (
            <TableCell><Skeleton variant='text' sx={{ fontSize: '1rem' }} /></TableCell>  
          ))}
        </TableRow>
      ))}
    </>
  ) : null
}

export default LoadingRow