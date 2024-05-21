import Card from '@mui/material/Card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import AddProjectDialog from './addProjectDialog'
import ProjectDetailDialog from './projectDetailDialog'
import { Project } from '../types/project'
import { getProjects , deleteProject } from '../services/projects'
import RoleProvider from './RoleProvider'
import StatusChip from './statusChip'
import { Alert } from '@mui/material'

const columns: GridColDef<(any)[number]>[] = [
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return <StatusChip value={params.value} />
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
    field: 'start_date',
    headerName: 'Startdatum',
    width: 150,
    editable: false,
    renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
  },
  {
    field: 'end_date',
    headerName: 'EndDatum',
    width: 150,
    editable: false,
    renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
  },
  {
    field: 'project_lead',
    headerName: 'Projektleiter',
    width: 150,
    editable: false,
    renderCell: (params) => params.value ? params.value.firstname + ' ' + params.value.lastname : '',
  },
  {
    field: 'sub_project_lead',
    headerName: 'Stellv. Projektleiter',
    width: 150,
    editable: false,
    renderCell: (params) => params.value ? params.value.firstname + ' ' + params.value.lastname : '',
  },
  {
    field: 'actions',
    headerName: '',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return (
        <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
          <Button variant='contained' size='small' onClick={() => handleDelete(params.row)}>Löschen</Button>
        </RoleProvider>
      )
    }
  }
]

function handleDelete(project: Project) {
  console.log('delete project', project)
  deleteProject(project.id)
    .then(() => alert('Projekt wurde gelöscht'))
    .catch(() => alert("Projekt konnte nicht gelöscht werden"))
} 

export default function ProjectsTable() {
  const [projektes, setProjekte] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openProjectDetailDialog, setOpenProjectDetailDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [project, setProject] = useState<null | any>(null)
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingProjects(true)
    getProjects()
      .then(data => setProjekte(data))
      .catch(error => alert(error))
      .finally(() => setIsLoadingProjects(false))
  }, [searchTerm, openAddProjectDialog])

  console.log(projektes)

  const handleCellClick = (params: any) => {
    if (params.field !== 'actions') {
      setProject(params.row)
      setOpenProjectDetailDialog(true)
    } else {
      console.log('action clickled', params.row)
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Card>
        <Stack direction='row' spacing={2} justifyContent="flex-end" alignItems="center" sx={{ margin: 2 }}>
          <TextField placeholder='Suche ...' size='small' onChange={handleSearch} />
          <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
            <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenAddProjectDialog(true)}>Projekt</Button>
          </RoleProvider>
        </Stack>
        <DataGrid
          loading={isLoadingProjects}
          sx={{ minHeight: 50}}
          rows={projektes}
          columns={columns}
          onCellClick={(params) => handleCellClick(params)}
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            sorting: {
              sortModel: [
                {
                  field: 'start_date',
                  sort: 'asc',
                },
              ]
            }
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