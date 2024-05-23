import React from 'react'
import { Grid, Typography, Card, CardContent, Skeleton, CardActionArea } from '@mui/material'
import { Project } from '../types/project'
import StatusChip from './statusChip'

interface MyProjectsProps {
  projects: Project[]
  loadingProjects: boolean
  cardClick: (project: Project) => void
}

const MyProjects: React.FC<MyProjectsProps> = ({ projects, loadingProjects, cardClick }) => {
  
  return (
    <>
      <Grid container gap={2} columns={4}>
        {projects.map((project) => (
          <Grid item xs={1}>
            <Card variant='elevation'>
              <CardActionArea onClick={() => cardClick(project)}>
                <CardContent>
                  <Typography variant='h6' component="div">{project.title}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {project.project_lead?.firstname} {project.project_lead?.lastname}
                  </Typography>
                  <StatusChip value={project.status} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {loadingProjects ? [1, 2, 3].map(() => (
          <Grid item xs={1}>
            <Skeleton variant="rectangular" height={108} />
          </Grid>
        )) : null}
      </Grid>
    </>
  )
}

export default MyProjects