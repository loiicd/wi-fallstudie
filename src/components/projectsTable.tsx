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
import { getProjects } from '../services/projects'
import RoleProvider from './RoleProvider'
import StatusChip from './statusChip'
import { ApiResponse } from '../types/apiResponse'
import { useNavigate } from 'react-router-dom'

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
]

export default function ProjectsTable() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openProjectDetailDialog, setOpenProjectDetailDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openEditProjectDialog, setOpenEditProjectDialog] = useState<boolean>(false)
  const [hoverProjectDetail, setHoverProjectDetail] = useState<boolean>(false)
  const [project, setProject] = useState<null | any>(null)
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects}))
      .catch(error => setProjects({ state: 'error', message: error}))
      console.log('projects state: ' + projects.state)
  }, [searchTerm, openAddProjectDialog, openProjectDetailDialog, openEditProjectDialog])

  const handleCellClick = (project: any) => {
    setProject(project)
    navigate(`/project/${project.id}`)
  }

  const editProject = () => {
    setOpenProjectDetailDialog(false);
    setOpenEditProjectDialog(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRowHovered = (event: React.MouseEvent<HTMLElement>) => {
    const rowId = event.currentTarget?.dataset?.id
    document.dispatchEvent(
      new CustomEvent(`row${rowId}HoverChange`, { detail: { hovered: true } })
    )
    if (projects.state === 'success') {
      const foundProject = projects.data.find((project: { id: string | undefined }) => project.id === rowId);
      setProject(foundProject);
      setHoverProjectDetail(true);
      setOpenProjectDetailDialog(true);
      console.log('found: ' + foundProject?.title);
      console.log('set: ' + project?.title);
    }
}

  const handleRowLeaved = (event: React.MouseEvent<HTMLElement>) => {
    const rowId = event.currentTarget?.dataset?.id;
    document.dispatchEvent(
      new CustomEvent(`row${rowId}HoverChange`, { detail: { hovered: false } })
    )
    setHoverProjectDetail(false)
    setProject(null)
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
          loading={projects.state === 'loading'}
          sx={{ minHeight: 50}}
          rows={projects.state === 'success' ? projects.data : []}
          columns={columns}
          onCellClick={(params) => handleCellClick(params.row)}
          slotProps={
            { row: { 
              onMouseEnter: handleRowHovered, 
              // onMouseLeave: handleRowLeaved
            } }
          }
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
      {openProjectDetailDialog && project ? <ProjectDetailDialog project={project} open={openProjectDetailDialog} handleClose={() => setOpenProjectDetailDialog(false)} handleEdit={() => editProject()} /> : null}
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
      {openEditProjectDialog && project ? <AddProjectDialog open={openEditProjectDialog} handleClose={() => setOpenEditProjectDialog(false)} project={project} /> : null}
      {hoverProjectDetail && project ? <ProjectDetailDialog project={project} open={openProjectDetailDialog} handleClose={() => setHoverProjectDetail(false)} handleEdit={() => editProject()} /> : null}
    </>
  )
}

// function useFocusEffect(arg0: () => void, arg1: (string | boolean)[]) {
//   throw new Error('Function not implemented.')
// }
