
import { useState, SyntheticEvent, useEffect, ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { FunctionComponent } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { User } from '../types/user'
import { getUsers } from '../services/user'
import CircularProgress from '@mui/material/CircularProgress'
import { postProject } from '../services/projects'
import { ProjectFormData, ProjectType } from '../types/project'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'

interface AddProjectDialogProps {
  open: boolean
  handleClose: () => void
}

const AddProjectDialog: FunctionComponent<AddProjectDialogProps> = ({ open, handleClose }) => {
  const [tab, setTab] = useState<string>('1')
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({ title: '', status: 'Entwurf', team: [] })
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)
  const [projectTeam, setProjectTeam] = useState<string[]>([])
  const [isSavingProject, setIsSavingProject] = useState<boolean>(false)
  const [titleInputError, setTitleInputError] = useState<boolean>(false)

  const handleChangeTab = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  const handleSave = () => {
    if (projectFormData.title !== '') {
      setIsSavingProject(true)
      postProject({ ...projectFormData, team: projectTeam })
        .then(() => handleClose())
        .catch(error => alert(error))
        .finally(() => setIsSavingProject(false))
    } else {
      setTitleInputError(true)
    }
  }

  useEffect(() => {
    setIsLoadingUsers(true)
    getUsers()
      .then(data => setUsers(data))
      .catch(error => alert(error))
      .finally(() => setIsLoadingUsers(false))
  }, [])

  const handleChange = (field: keyof ProjectFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    setProjectFormData({
      ...projectFormData,
      [field]: event.target.value,
    })
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setProjectFormData({
      ...projectFormData,
      status: event.target.value as ProjectType,
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle>Projekt erstellen</DialogTitle>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Allgemein" value='1' />
            <Tab label="Rollen" value='2' />
            <Tab label="Beschreibungen" value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Grid container spacing={4} sx={{ paddingY: 2 }}>
            <Grid item xs={6} sx={{ justifyContent: 'stretch' }}>
              <TextField 
                error={titleInputError}
                label='Titel' 
                size='small' 
                required 
                value={projectFormData.title}
                sx={{ width: '100%'}} 
                onChange={handleChange('title')} 
              />
              {titleInputError && <p style={{ color: 'red', fontSize: '0.75rem', margin: '0.5rem 0' }}>Bitte geben Sie einen Titel ein</p>}
            </Grid>
            <Grid item xs={6}>
              <Select 
                label='Feld 2' 
                size='small' 
                value={projectFormData.status}
                sx={{ width: '100%'}} 
                onChange={(event: SelectChangeEvent<string>) => handleStatusChange(event)}
              >
                <MenuItem value='Entwurf'>Entwurf</MenuItem>
                <MenuItem value='Eingereicht'>Eingereicht</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker 
                label='Startdatum' 
                views={['day', 'month', 'year']} 
                value={projectFormData.start_date} 
                slotProps={{ textField: { size: 'small' } }} 
                sx={{ width: '100%'}} 
                onChange={(newValue) => setProjectFormData({ ...projectFormData, start_date: newValue })}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker 
                label='Enddatum' 
                views={['day', 'month', 'year']}
                value={projectFormData.end_date} 
                slotProps={{ textField: { size: 'small' } }} 
                sx={{ width: '100%'}} 
                onChange={(newValue) => setProjectFormData({ ...projectFormData, end_date: newValue })}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Grid container spacing={4} sx={{ paddingY: 2 }}>
          <Grid item xs={6}>
              <Autocomplete 
                options={users} 
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
                loading={isLoadingUsers}
                onChange={(event, newUser) => newUser ? setProjectFormData({ ...projectFormData, project_lead_id: newUser.id }) : null}
                renderInput={params => 
                  <TextField 
                    {...params} 
                    label="Projektleiter" 
                    size='small' 
                    sx={{ width: '100%'}} 
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete 
                options={users} 
                getOptionKey={(option) => option.id}
                getOptionLabel={option => option.firstname + ' ' + option.lastname}
                loading={isLoadingUsers}
                onChange={(event, newUser) => newUser ? setProjectFormData({ ...projectFormData, sub_project_lead_id: newUser.id }) : null}
                renderInput={params => 
                  <TextField 
                    {...params} 
                    label="Stv. Projektleiter" 
                    size='small' 
                    sx={{ width: '100%'}} 
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                } 
              />
            </Grid>
            <Grid item xs={6} sx={{ justifyContent: 'stretch' }}>
              <Autocomplete 
                getOptionKey={(option) => option.id}
                multiple
                options={users} 
                getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
                loading={isLoadingUsers}
                onChange={(event, value) => setProjectTeam(value.map((item) => item.id))}
                renderInput={params => 
                  <TextField 
                    {...params} 
                    label="Projektteam" 
                    size='small' 
                    sx={{ width: '100%'}} 
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Grid container spacing={4} sx={{ paddingY: 2 }}>
            <Grid item xs={12}>
              <TextField 
                label='Kurzbeschreibung' 
                size='small' 
                value={projectFormData.short_description}
                sx={{ width: '100%'}} 
                multiline 
                rows={4} 
                onChange={handleChange('short_description')} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Ziel' 
                size='small' 
                value={projectFormData.target_description}
                sx={{ width: '100%'}} 
                multiline 
                rows={4} 
                onChange={handleChange('target_description')} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Vision' 
                size='small' 
                value={projectFormData.vision_description}
                sx={{ width: '100%'}} 
                multiline
                rows={4} 
                onChange={handleChange('vision_description')} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Problemstellung' 
                size='small' 
                value={projectFormData.problem_description}
                sx={{ width: '100%'}} 
                multiline 
                rows={4} 
                onChange={handleChange('problem_description')} 
              />
            </Grid>
          </Grid>
        </TabPanel>
        </TabContext>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
        <LoadingButton variant='contained' onClick={handleSave} autoFocus loading={isSavingProject}>Speichern</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog