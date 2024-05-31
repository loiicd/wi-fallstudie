import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid'
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
 import { useEffect, useState } from 'react'
 import { Project } from '../../types/project'
 import { saveRelation } from "../../services/projectRelation";
 import { UserContext } from "../../context/userContext";
import { User } from "../../types/user";
import { ProjectProjectRelation } from "../../types/projectProjectRelation";

export type RolesSectionProps = {
    project: Project
    setOpenNewRelationDialog: (value: boolean) => void
    openNewRelationDialog: boolean
}

export const ProjectRelationDialog = ({ project, openNewRelationDialog, setOpenNewRelationDialog }: RolesSectionProps ) => {
    const [selectableProjects, setSelectableProjects] = useState<Project[]>([])
    const { activeUser } = useContext(UserContext)
    const [newRelation, setNewRelation] = useState<ProjectProjectRelation>({id: undefined, project_1: project, project_2: project, relation_name_1_to_2:'test1', relation_name_2_to_1:'test2', created_from:activeUser})

    useEffect(() => {
        console.log('TODO: Load selectable Projects')
    }, [])
    
    const handleSave = () => {
        console.log("handleSave()")
        if (activeUser) {
            saveRelation(newRelation)
            .then(() => {
                console.log("created")
            }
            )
        }
    }
    
    const handleClose = () => {
        setOpenNewRelationDialog(false)
    }
    
    return (
        <Dialog open={openNewRelationDialog} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Neue Beziehung</DialogTitle>
            <DialogContent dividers>
            <DialogContentText>
                <Grid container direction="row" spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Grid item>
                        <Typography variant={'caption'}>Dieses projekt.. </Typography>
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