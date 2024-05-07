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
import Chip from '@mui/material/Chip'
import DraftsIcon from '@mui/icons-material/Drafts'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import VerifiedIcon from '@mui/icons-material/Verified'
import UpdateIcon from '@mui/icons-material/Update'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import { postUser } from '../services/user'

const columns: GridColDef<(any)[number]>[] = [
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: false,
    renderCell: (params) => {
      switch(params.value) {
        case 'Entwurf': return (<Chip variant='outlined' icon={<DraftsIcon />} label={params.value} color="default" />)
        case 'Eingereicht': return (<Chip variant='outlined' icon={<MoveToInboxIcon />} label={params.value} color="default" />)
        case 'In Prüfung': return (<Chip variant='outlined' icon={<UpdateIcon />} label={params.value} color="warning" />)
        case 'Angenommen': return (<Chip variant='outlined' icon={<VerifiedIcon />} label={params.value} color="success" />)
        case 'Abgelehnt': return (<Chip variant='outlined' icon={<DoNotDisturbOnIcon />} label={params.value} color="error" />)
      }
    }
  },
  {
    field: 'title',
    headerName: 'Titel',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'projectLead',
    headerName: 'Projektleiter',
    width: 150,
    editable: false,
    type: 'string',
    renderCell: (params) => (params.value.firstname + ' ' + params.value.lastname)
  },
  {
    field: 'subProjectLead',
    headerName: 'Stelv. Projektleiter',
    width: 150,
    editable: false,
    type: 'string',
    renderCell: (params) => (params.value.firstname + ' ' + params.value.lastname)
  },
  {
    field: 'startDate',
    headerName: 'Startdatum',
    width: 150,
    editable: false,
    type: 'date'
  },
  {
    field: 'endDate',
    headerName: 'EndDatum',
    width: 150,
    editable: false,
    type: 'date'
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