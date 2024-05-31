import React from "react";
import {
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
 } from '@mui/material'

 import { Project } from '../types/project'

export type RolesSectionProps = {
    project: Project
    setOpenNewRelationDialog: (value: boolean) => void
    openNewRelationDialog: boolean
}

export const ProjectRelationDialog = ({ project, openNewRelationDialog, setOpenNewRelationDialog }: RolesSectionProps ) => {
    
    return (
        <>
            <Dialog open={openNewRelationDialog}>
                <DialogTitle>Neue Beziehung</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    TODO
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNewRelationDialog(false)}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}