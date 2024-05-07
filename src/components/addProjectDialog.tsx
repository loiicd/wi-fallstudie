
import { useState, SyntheticEvent } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
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

interface AddProjectDialogProps {
  open: boolean
  handleClose: () => void
}

const AddProjectDialog: FunctionComponent<AddProjectDialogProps> = ({ open, handleClose }) => {
  const [tab, setTab] = useState<string>('1')

  const handleChangeTab = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  const handleSave = () => {
    console.log('Save')
    handleClose()
  }

  const users = ['User 1', 'User 2', 'User 3', 'User 4']

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Projekt erstellen</DialogTitle>
      {/* <DialogContent> */}
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
                <TextField label='Name' size='small' required sx={{ width: '100%'}} />
              </Grid>
              <Grid item xs={6}>
                <TextField label='Feld 2' size='small' sx={{ width: '100%'}} />
              </Grid>
              <Grid item xs={12}>
              <TextField label='Beschreibung' size='small' sx={{ width: '100%'}} multiline rows={4} />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete options={users} renderInput={(params) => <TextField {...params} label="Projektleiter" size='small' sx={{ width: '100%'}} />} />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete options={users} renderInput={(params) => <TextField {...params} label="Stv. Projektleiter" size='small' sx={{ width: '100%'}} />} />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker label='Startdatum' views={['day', 'month', 'year']} slotProps={{ textField: { size: 'small' } }} sx={{ width: '100%'}} />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker label='Enddatum' views={['day', 'month', 'year']} slotProps={{ textField: { size: 'small' } }} sx={{ width: '100%'}} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='2'>Projektteam</TabPanel>
          <TabPanel value='3'>Item Three</TabPanel>
          </TabContext>
      {/* </DialogContent> */}
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
        <Button variant='contained' onClick={handleSave} autoFocus>Speichern</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog