import Card from '@mui/material/Card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
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
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'

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
    headerName: 'Actions',
    width: 150,
    editable: false,
    renderCell: () => {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      return (
        <>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Aktionen
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); alert("Edit Pressed"); }}>Edit</MenuItem>
            <MenuItem onClick={() => { handleClose(); alert("Delete Pressed"); }}>Delete</MenuItem>
          </Menu>
        </>
      );
    }
  },
]

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
          <RoleProvider roles={['projekteigner', 'projektmanager', 'administrator']} type='include'>
            <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenAddProjectDialog(true)}>Projekt</Button>
          </RoleProvider>
        </Stack>
        <DataGrid
          loading={isLoadingProjects}
          sx={{ minHeight: 50}}
          rows={projektes}
          columns={columns}
          onCellClick={(params) => {
            if (params.field !== 'actions') {
              handleCellClick(params.row);
            }
          }}
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