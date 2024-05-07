import Card from '@mui/material/Card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { getProjects } from '../services/getProjects'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import AddProjectDialog from './addProjectDialog'
import ProjectDetailDialog from './projectDetailDialog'

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

export default function ProjectsTable() {
  const [projektes, setProjekte] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openProjectDetailDialog, setOpenProjectDetailDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [project, setProject] = useState<null | any>(null)

  useEffect(() => {
    getProjects()
      .then(data => setProjekte(data))
      .catch(error => alert(error))
  }, [searchTerm])

  const handleCellClick = (project: any) => {
    setProject(project)
    setOpenProjectDetailDialog(true)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Card>
        <Stack direction='row' spacing={2} justifyContent="flex-end" alignItems="center" sx={{ margin: 2 }}>
          <TextField placeholder='Suche ...' size='small' onChange={handleSearch} />
          <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenAddProjectDialog(true)}>Projekt</Button>
        </Stack>
        <DataGrid
          rows={projektes}
          columns={columns}
          onCellClick={(params) => handleCellClick(params.row)}
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
      {openProjectDetailDialog && project ? <ProjectDetailDialog project={project} open={openProjectDetailDialog} handleClose={() => setOpenProjectDetailDialog(false)} /> : null}
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
    </>
  )
}