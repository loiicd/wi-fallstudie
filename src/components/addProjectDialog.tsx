
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
import { ProjectFormData } from '../types/project'

interface AddProjectDialogProps {
  open: boolean
  handleClose: () => void
}

const AddProjectDialog: FunctionComponent<AddProjectDialogProps> = ({ open, handleClose }) => {
  const [tab, setTab] = useState<string>('1')
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({ title: '', status: 'Entwurf', team: [] })
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)

  const handleChangeTab = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  const handleSave = () => {
    postProject(projectFormData)
      .then(() => handleClose())
      .catch(error => alert(error))
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

  console.log(projectFormData)

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
            <Tab label="Projektteam" value='2' />
            <Tab label="Item Three" value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Grid container spacing={4} sx={{ paddingY: 2 }}>
            <Grid item xs={6} sx={{ justifyContent: 'stretch' }}>
              <TextField label='Name' size='small' required sx={{ width: '100%'}} onChange={handleChange('title')} />
            </Grid>
            <Grid item xs={6}>
              <TextField label='Feld 2' size='small' sx={{ width: '100%'}} />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Beschreibung' size='small' sx={{ width: '100%'}} multiline rows={4} />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete 
                options={users} 
                getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
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
                getOptionLabel={option => option.firstname + ' ' + option.lastname}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                loading={isLoadingUsers}
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
            <Grid item xs={6}>
              <DateTimePicker label='Startdatum' views={['day', 'month', 'year']} slotProps={{ textField: { size: 'small' } }} sx={{ width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker label='Enddatum' views={['day', 'month', 'year']} slotProps={{ textField: { size: 'small' } }} sx={{ width: '100%'}} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Grid container spacing={4} sx={{ paddingY: 2 }}>
            <Grid item xs={6} sx={{ justifyContent: 'stretch' }}>
              <Autocomplete 
                multiple
                options={users} 
                getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
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
        <TabPanel value='3'>Item Three</TabPanel>
        </TabContext>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
        <Button variant='contained' onClick={handleSave} autoFocus>Speichern</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog