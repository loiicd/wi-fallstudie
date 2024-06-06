import React, { useContext } from "react";
import {
    Autocomplete,
    Button,
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
import { ApiResponse } from "../../types/apiResponse";
import { getProjects } from "../../services/projects";
import { LoadingButton } from "@mui/lab";
import ProjectRessourceGeneric from "../../types/projectResourceGeneric";
import { saveRessource } from "../../services/projectRessource";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from "dayjs";

type ProjectRessourceDialogProps = {
    project: Project
    setOpenNewProjectRessourceDialog: (value: boolean) => void
    openNewProjectRessourceDialog: boolean
    handleReload: () => void
    type: string
    labels: string[]
    dialog_heading: string
}

const ProjectRessourceDialog = ({ project, openNewProjectRessourceDialog, setOpenNewProjectRessourceDialog, handleReload, type, labels, dialog_heading}: ProjectRessourceDialogProps ) => {
    const [projects, setProjects] = useState<ApiResponse<Project[]>>({ state: 'loading' })
    const [projectRessource, setProjectRessource] = useState<ProjectRessourceGeneric>({id: undefined, title: '', value: '', type: type, project_id: project.id, project: project, date: new Date().toISOString()})
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getProjects()
            .then(projects => setProjects({ state: 'success', data: projects }))
            .catch(error => setProjects({ state: 'error', message: error }))
      }, [])
    
    const handleSave = () => {
        setLoading(true)
        saveRessource(projectRessource)
        .then(() => {
          setLoading(false)
          handleClose()
      })
    }
    
    const handleClose = () => {
        setOpenNewProjectRessourceDialog(false)
        handleReload()
    }

    const titleOptions = [
        {id: 1, title: 'Intern'},
        {id: 2, title: 'Extern'},
    ]
    
    return (
        <Dialog open={openNewProjectRessourceDialog} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>{dialog_heading}</DialogTitle>
            <DialogContent dividers>
            <DialogContentText>
                <Grid container direction="row"xs={12} spacing={1} sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                    {labels.includes("Monat")  ?
                            <Grid item>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant={'caption'}>{labels[0]}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <DateTimePicker 
                                            views={['month', 'year']} 
                                            value={dayjs(projectRessource.date)}
                                            sx={{ width: '100%'}} 
                                            onChange={(value: Dayjs | null) => {
                                                setProjectRessource({...projectRessource, date: value ? value.format() : ''})
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                    : null}
                    <Grid item style={{ flexGrow: 1 }}>
                        <Grid container direction={'column'}>
                            <Grid item xs={12}>
                                <Typography variant={'caption'}>{labels[labels.length - 2]}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <>
                                {labels[labels.length - 1] === 'FTE' ? 
                                    <Autocomplete 
                                    disableClearable
                                    value={titleOptions.find(option => option.title === projectRessource.title)}
                                    options={titleOptions}
                                    getOptionKey={option => option.id}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => <TextField 
                                        required 
                                        {...params}
                                        error={projectRessource.title === ""} />}
                                    onChange={(_, option) => setProjectRessource({...projectRessource, title: option.title})}
                                    />
                                : 
                                <TextField value={projectRessource.title} variant="outlined" fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setProjectRessource({...projectRessource, title: event.target.value})
                                    }}/>
                                }
                                </>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <Typography variant={'caption'}>{labels[labels.length - 1]}</Typography>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    value={projectRessource.value} 
                                    variant="outlined" fullWidth 
                                    error={parseInt(projectRessource.value) < 0}
                                    helperText={parseInt(projectRessource.value) ? 'Der Wert darf nicht kleiner als 0 sein' : ''}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setProjectRessource({...projectRessource, value: event.target.value})
                                    }}
                                    
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} disabled={loading}>Abbrechen</Button>
                <LoadingButton onClick={() => handleSave()} loading={loading} disabled={
                    projectRessource.title === "" || projectRessource.value === "" || projectRessource.date === ""
                }>Speichern</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectRessourceDialog