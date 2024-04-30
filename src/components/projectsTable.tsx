import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import projekte from '../projekte.json'
import { Navigate, useNavigate } from 'react-router-dom'

const columns: GridColDef<(typeof projekte)[number]>[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'auftraggeber',
    headerName: 'Auftraggeber',
    width: 150,
    editable: false,
  },
  {
    field: 'kunde',
    headerName: 'Kunde',
    width: 150,
    editable: false,
  },
  {
    field: 'projektLeiter',
    headerName: 'Projektleiter',
    width: 150,
    editable: false,
  },
  {
    field: 'startDatum',
    headerName: 'Startdatum',
    width: 150,
    editable: false,
  },
  {
    field: 'endDatum',
    headerName: 'EndDatum',
    width: 150,
    editable: false,
  },
]

export default function ProjectsTable() {
  const navigate = useNavigate()

  return (
    <Box>
      <DataGrid
        rows={projekte}
        columns={columns}
        onCellClick={(params) => navigate(`/project/${params.row.id}`)}
        pageSizeOptions={[5, 10, 15]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
      />
    </Box>
  )
}