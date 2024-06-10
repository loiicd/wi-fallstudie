import React, { useContext } from "react";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Project } from '../../types/project'
import { saveRelation } from "../../services/projectRelation";
import { UserContext } from "../../context/userContext";
import { ProjectProjectRelation, roleOptions } from "../../types/projectProjectRelation";
import { ApiResponse } from "../../types/apiResponse";
import { getProjects } from "../../services/projects";
import { LoadingButton } from "@mui/lab";

export type RolesSectionProps = {
    project: Project
    setOpenNewRelationDialog: (value: boolean) => void
    openNewRelationDialog: boolean
    handleReloadProject: () => void
}

export const ProjectRelationDialog = ({ project, openNewRelationDialog, setOpenNewRelationDialog, handleReloadProject}: RolesSectionProps ) => {
    const { activeUser } = useContext(UserContext)
    const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
    const [projectRelation, setProjectRelation] = useState<ProjectProjectRelation>({id: undefined, project_1: project, project_2: undefined, relation_name_1_to_2:'---', relation_name_2_to_1:'---', created_from:activeUser})
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getProjects()
            .then(projects => setProjects({ state: 'success', data: projects }))
            .catch(error => setProjects({ state: 'error', message: error }))
      }, [])
    
    const handleSave = () => {
        setLoading(true)
        if (activeUser) {
            saveRelation(projectRelation)
            .then(() => {
                setLoading(false)
                handleClose()
            })
        }
    }
    
    const handleClose = () => {
        setOpenNewRelationDialog(false)
        handleReloadProject()
    }
    
    return (
        <Dialog open={openNewRelationDialog} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Neue Beziehung</DialogTitle>
            <DialogContent dividers>
            <DialogContentText>
                <Grid container direction="row" spacing={2} xs={12} sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                    <Grid item xs={4}>
                        <Grid container direction={'column'} spacing={2}>
                            <Grid item>
                                <Typography variant={'caption'}>Dieses projekt.. </Typography>
                            </Grid>
                            <Grid item>
                                <TextField value={project.title} variant="outlined" disabled fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction={'column'} spacing={2}>
                            <Grid item>
                                <Typography variant={'caption'}>macht..</Typography>
                            </Grid>
                            <Grid item>
                            <Autocomplete 
                                disableClearable
                                value={roleOptions.find(option => option.relation_name_1_to_2 === projectRelation.relation_name_1_to_2)}
                                options={roleOptions}
                                getOptionKey={option => option.id}
                                getOptionLabel={(option) => option.relation_name_1_to_2}
                                renderInput={(params) => <TextField 
                                    required 
                                    {...params}
                                    error={projectRelation.relation_name_1_to_2 === '---'}
                                    />
                                }
                                onChange={(_, option) => setProjectRelation({...projectRelation, 
                                    relation_name_1_to_2: option.relation_name_1_to_2,
                                    relation_name_2_to_1: option.relation_name_2_to_1
                                })}
                                fullWidth
                                disabled={loading}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container direction={'column'} spacing={2}>
                            <Grid item>
                                <Typography variant={'caption'}>zu..</Typography>
                            </Grid>
                            <Grid item>
                                {projects.state === 'success' ? 
                                    <Autocomplete 
                                        disableClearable
                                        value={projectRelation.project_2}
                                        options={projects.data}
                                        getOptionKey={option => option.id}
                                        getOptionLabel={option => option.title}
                                        renderInput={(params) => <TextField 
                                            required 
                                            {...params}
                                            helperText={projectRelation.project_2?.id === project.id ? 'Ein Projekt kann nicht mit sich selbst in Beziehung stehen' : ''}
                                            error={projectRelation.project_2?.id === project.id || projectRelation.project_2 === undefined} />}
                                        onChange={(_, newProject) => {
                                            setProjectRelation({...projectRelation, project_2: newProject})
                                        }}
                                        fullWidth
                                        disabled={loading}
                                        
                                    />
                                :
                                <Autocomplete 
                                        disableClearable
                                        options={[]}
                                        renderInput={(params) => 
                                            <TextField style={{ maxHeight: '56px', maxWidth: '338px' }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <CircularProgress size={24} />
                                                    ),
                                                }}
                                            />}
                                        disabled
                                        fullWidth
                                    />
                            }
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} disabled={loading}>Abbrechen</Button>
                <LoadingButton onClick={() => handleSave()} loading={loading} disabled={
                    projectRelation.project_2 === undefined || projectRelation.relation_name_1_to_2 === '---' || projectRelation.relation_name_2_to_1 === '---' || projectRelation.project_2 === project
                }>Speichern</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}