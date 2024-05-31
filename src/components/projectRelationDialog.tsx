import React from "react";
import {
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
    Grid,
    Typography
 } from '@mui/material'

 import { Project } from '../types/project'

export type RolesSectionProps = {
    project: Project
    setOpenNewRelationDialog: (value: boolean) => void
    openNewRelationDialog: boolean
}

export const ProjectRelationDialog = ({ project, openNewRelationDialog, setOpenNewRelationDialog }: RolesSectionProps ) => {
    
    const handleSave = () => {
        console.log('TODO: Save Project Relation')
        alert('TODO: Save Project Relation')
    }
    
    const handleClose = () => {
        setOpenNewRelationDialog(false)
    }
    
    return (
        <Dialog open={openNewRelationDialog} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Neue Beziehung</DialogTitle>
            <DialogContent dividers>
            <DialogContentText>
                <Grid container direction="row" spacing={2} sx={{justifyContent: "space-between"}}>
                    <Grid item>
                        <Typography>{project.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Beziehung</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Projekt 2</Typography>
                    </Grid>
                </Grid>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSave()}>Speichern</Button>
                <Button onClick={() => handleClose()}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    )
}