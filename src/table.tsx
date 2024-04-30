import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ReactNode } from 'react'

type Project = {
  id: string
  name: string
  description: string
  budget: number
  stars: ReactNode
}

const projects: Project[] = [
  { id: '1', name: 'Project 1', description: 'Description 1', budget: 1000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '2', name: 'Project 2', description: 'Description 2', budget: 2000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '3', name: 'Project 3', description: 'Description 3', budget: 3000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '4', name: 'Project 4', description: 'Description 4', budget: 4000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '5', name: 'Project 5', description: 'Description 5', budget: 5000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '6', name: 'Project 6', description: 'Description 6', budget: 6000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '7', name: 'Project 7', description: 'Description 7', budget: 7000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '8', name: 'Project 8', description: 'Description 8', budget: 8000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '9', name: 'Project 9', description: 'Description 9', budget: 9000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '10', name: 'Project 10', description: 'Description 10', budget: 10000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '11', name: 'Project 11', description: 'Description 11', budget: 11000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '12', name: 'Project 12', description: 'Description 12', budget: 12000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '13', name: 'Project 13', description: 'Description 13', budget: 13000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '14', name: 'Project 14', description: 'Description 14', budget: 14000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '15', name: 'Project 15', description: 'Description 15', budget: 15000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '16', name: 'Project 16', description: 'Description 16', budget: 16000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '17', name: 'Project 17', description: 'Description 17', budget: 17000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '18', name: 'Project 18', description: 'Description 18', budget: 18000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '19', name: 'Project 19', description: 'Description 19', budget: 19000, stars: <Rating name="read-only" value={4} readOnly /> },
  { id: '20', name: 'Project 20', description: 'Description 20', budget: 20000, stars: <Rating name="read-only" value={4} readOnly /> },
]

const columns: GridColDef<(typeof projects)[number]>[] = [
  {
    field: 'name',
    headerName: 'Projekt Name',
    width: 150,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Beschreibung',
    width: 150,
    editable: false,
  },
  {
    field: 'budget',
    headerName: 'Budget',
    width: 100,
    editable: false,
  },
  {
    field: 'stars',
    headerName: 'Sterne',
    width: 150,
    editable: false,
  }
]

export default function DataGridDemo() {
  return (
    <Box>
      <DataGrid
        rows={projects}
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
  );
}