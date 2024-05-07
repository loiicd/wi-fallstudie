import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef<(any)[number]>[] = [
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

export default function DataGridDemo() {
  console.log(projekte)

  return (
    <Box>
      <DataGrid
        rows={projekte}
        columns={columns}
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