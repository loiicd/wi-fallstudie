import Card from '@mui/material/Card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import projekte from '../projekte.json'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'

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

  const [projektes, setProjekte] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setProjekte(projekte.filter(projekt => projekt.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Card>
      <TextField placeholder='Suche ...' onChange={handleSearch} />
      <DataGrid
        rows={projektes}
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
        disableDensitySelector
        disableColumnSelector
        disableColumnMenu
        disableColumnResize
      />
    </Card>
  )
}