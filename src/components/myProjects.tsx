import React from 'react'
import { Grid, Typography, Card, CardContent, Skeleton } from '@mui/material'
import { Project } from '../types/project'

interface MyProjectsProps {
  projects: Project[]
  loadingProjects: boolean
}

const MyProjects: React.FC<MyProjectsProps> = ({ projects, loadingProjects }) => {
  return (
    <>
      <Grid container gap={2} columns={4}>
        {projects.map((project) => (
          <Grid item xs={1}>
            <Card variant='elevation'>
              <CardContent>
                <Typography variant='h6' component="div">{project.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {project.project_lead?.firstname} {project.project_lead?.lastname}
                </Typography>
                <Typography variant='body2'>{project.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {loadingProjects ? [1, 2, 3 ,4].map(() => (
          <Grid item xs={1}>
            <Skeleton variant="rectangular" height={108} />
          </Grid>
        )) : null}
      </Grid>
    </>
  )
}

export default MyProjects