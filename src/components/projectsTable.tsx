import { ApiResponse } from '../types/apiResponse'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef, GridFilterModel, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Project } from '../types/project'
import { getProjects } from '../services/projects'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import AddProjectDialog from './addProjectDialog'
import ProjectDetailDialog from './projectDetailDialog'
import RoleProvider from './RoleProvider'
import StatusChip from './statusChip'
import Rating from '@mui/material/Rating'

const ProjectsTable = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openProjectDetailDialog, setOpenProjectDetailDialog] = useState<boolean>(false)
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
  const [openEditProjectDialog, setOpenEditProjectDialog] = useState<boolean>(false)
  const [project, setProject] = useState<null | any>(null)
  const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
  const [searchedProjects, setSearchedProjects] = useState<(Project & { avgRate: number })[]>([])

  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })

  const columns: GridColDef<(any)[number]>[] = [
    {
      field: 'status',
      headerName: 'Status',
      editable: false,
      type: 'singleSelect',
      valueOptions: () => {
        const statusSet = new Set<string>()
        searchedProjects.forEach(project => statusSet.add(project.status))
        return Array.from(statusSet)
      },
      renderCell: (params) => <StatusChip value={params.value} />
    }, {
      field: 'title',
      headerName: 'Titel',
      editable: false,
      flex: 1,
      type: 'string',
    // }, {
    //   field: 'start_date',
    //   headerName: 'Startdatum',
    //   editable: false,
    //   type: 'date',
    //   renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
    // }, {
    //   field: 'end_date',
    //   headerName: 'EndDatum',
    //   editable: false,
    //   type: 'date',
    //   renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
    }, {
      field: 'project_lead',
      headerName: 'Projektleiter',
      editable: false,
      type: 'custom',
      renderCell: (params) => params.value ? params.value.firstname + ' ' + params.value.lastname : '',
    }, {
      field: 'sub_project_lead',
      headerName: 'Stellv. Projektleiter',
      editable: false,
      type: 'string',
      renderCell: (params) => params.value ? params.value.firstname + ' ' + params.value.lastname : '',
    }, {
      field: 'department',
      headerName: 'Abteilung',
      editable: false,
      flex: 1,
      type: 'singleSelect',
      valueOptions: () => {
        const departmentSet = new Set<string>()
        searchedProjects.forEach(project => {
          if (project.department) {
            departmentSet.add(project.department)
          }
        })
        return Array.from(departmentSet)
      },
    }, {
      field: 'location',
      headerName: 'Standort',
      editable: false,
      flex: 1,
      type: 'singleSelect',
      valueOptions: () => {
        const locationSet = new Set<string>()
        searchedProjects.forEach(project => {
          if (project.location) {
            locationSet.add(project.location)
          }
        })
        return Array.from(locationSet)
      },
    }, {
      field: 'avgRate',
      headerName: 'Bewertung',
      width: 140,
      editable: false,
      type: 'number',
      renderCell: (params) => (<Rating value={params.value} readOnly precision={0.1} />)
    }
  ]

  useEffect(() => {
    getProjects()
      .then(projects => setProjects({ state: 'success', data: projects}))
      .catch(error => setProjects({ state: 'error', message: error}))
  }, [openAddProjectDialog, openProjectDetailDialog, openEditProjectDialog])

  useEffect(() => {
    if (projects.state === 'success') {
      const filteredProjects = projects.data.filter(project => 
        project.title.includes(searchTerm) || 
        project.status.includes(searchTerm) || 
        project.department?.includes(searchTerm) ||
        project.location?.includes(searchTerm) ||
        project.project_lead?.firstname.includes(searchTerm) ||
        project.project_lead?.lastname.includes(searchTerm) ||
        project.sub_project_lead?.firstname.includes(searchTerm) ||
        project.sub_project_lead?.lastname.includes(searchTerm)
      )
      const updatedProjects = filteredProjects.map((project) => ({ ...project, avgRate: project.rates.reduce((sum, rate) => sum + rate.rate, 0) / project.rates.length }))
      setSearchedProjects(updatedProjects)
      }
    }, [searchTerm, projects])

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

  return (
    <>
      <Card>
        <Stack direction='row' spacing={2} justifyContent="flex-end" alignItems="center" sx={{ margin: 2 }}>
          <TextField placeholder='Suche ...' size='small' onChange={handleSearch} />
          <RoleProvider roles={['base', 'controller', 'administrator']} type='include'>
            <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenAddProjectDialog(true)}>Projekt</Button>
          </RoleProvider>
        </Stack>
        <DataGrid
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          loading={projects.state === 'loading'}
          autoHeight
          rows={projects.state === 'success' ? searchedProjects : []}
          columns={columns}
          onCellClick={(params) => handleCellClick(params.row)}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick
          disableDensitySelector
          disableColumnSelector
          disableColumnMenu
          disableColumnResize
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: false } }}
          initialState={{
            pagination: { paginationModel: {
              pageSize: 10,
            },},
            sorting: { sortModel: [{
              field: 'start_date',
              sort: 'asc',
            },]}
          }}
        />
      </Card>
      {openProjectDetailDialog && project ? <ProjectDetailDialog project={project} open={openProjectDetailDialog} handleClose={() => setOpenProjectDetailDialog(false)} handleEdit={() => editProject()} /> : null}
      {openAddProjectDialog ? <AddProjectDialog open={openAddProjectDialog} handleClose={() => setOpenAddProjectDialog(false)} /> : null}
      {openEditProjectDialog && project ? <AddProjectDialog open={openEditProjectDialog} handleClose={() => setOpenEditProjectDialog(false)} project={project} /> : null}
    </>
  )
}

export default ProjectsTable
