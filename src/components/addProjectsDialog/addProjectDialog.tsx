
import { useState, SyntheticEvent, useEffect, ChangeEvent, FunctionComponent, useContext } from 'react'
import { Project, ProjectFormData, ProjectStatus, Team } from '../../types/project'
import { postProject, updateProject } from '../../services/projects'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { UserContext } from '../../context/userContext'
import { getUsers } from '../../services/user'
import { User } from '../../types/user'
import { locations } from '../../types/location'
import { departments } from '../../types/department'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CircularProgress from '@mui/material/CircularProgress'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'
import dayjs from 'dayjs'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import { ProjectRessourceTable } from './ressourceTable'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useSnackbar } from 'notistack'
import MiscalaniousSection from './miscalaniousSection'

interface AddProjectDialogProps {
  open: boolean
  handleClose: () => void
  project?: Project
}

const AddProjectDialog: FunctionComponent<AddProjectDialogProps> = ({ open, handleClose, project}) => {
  const { activeUser } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()
  const [tab, setTab] = useState<string>('1')
  const [projectFormData, setProjectFormData] = useState<Project | ProjectFormData>(project ? project : { title: '', status: 'Entwurf', team: [], created_from: '1', links: []})
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)
  const [projectTeam, setProjectTeam] = useState<string[]>([])
  const [isSavingProject, setIsSavingProject] = useState<boolean>(false)
  const [titleInputError, setTitleInputError] = useState<boolean>(false)

  const handleChangeTab = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  const handleSave = () => {
    setIsSavingProject(true)
    if (projectFormData.id) {
      updateProject(projectFormData as Project)
        .then(() => {
          handleClose()
          enqueueSnackbar('Änderungen gespeichert', { variant: 'success'})
        })
        .catch(error => alert(error))
        .finally(() => setIsSavingProject(false))
    } else if (projectFormData.title !== '') {
      postProject({ ...projectFormData, team: projectTeam, created_from: activeUser!.id } as ProjectFormData)
        .then(() => {
          handleClose()
          enqueueSnackbar('Projekt erstellt', { variant: 'success'})
        })
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
      status: event.target.value as ProjectStatus,
    })
  }

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setProjectFormData({
      ...projectFormData,
      location: event.target.value,
    })
  }

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setProjectFormData({
      ...projectFormData,
      department: event.target.value,
    })
  }
  
  const handleLinksChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectFormData((prevData) => {
      const newLinks = prevData.links ? [...prevData.links] : [];
      const linkIndex = newLinks.findIndex((link) => link.type === type);
      if (linkIndex !== -1) {
        newLinks[linkIndex] = { ...newLinks[linkIndex], url: event.target.value };
      } else {
        newLinks.push({ type: type, url: event.target.value });
      }
      return { ...prevData, links: newLinks };
    });
    console.log("projectFormData", projectFormData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
      PaperProps={{
        style: {
          height: '800px',
          overflow: 'auto',
        },
      }}
    >
      {projectFormData.id ? <DialogTitle>Bearbeiten: {projectFormData.title}</DialogTitle> : <DialogTitle>Neues Projekt</DialogTitle>}
      <DialogContent dividers>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Allgemein" value='1' />
              <Tab label="Rollen" value='2' />
              <Tab label="Pers. Ressourcen" value='3' />
              <Tab label="Budget" value='4' />
              <Tab label="Kompläxität" value='5' />
              <Tab label="Beschreibungen" value='6' />
              <Tab label="Weiteres" value='7' />
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
              <Grid item xs={6} sx={{ justifyContent: 'stretch' }}>
                <FormControl fullWidth size='small'>
                  <InputLabel>Abteilung</InputLabel>
                  <Select
                    value={projectFormData.department}
                    label="Abteilung"
                    size='small' 
                    sx={{ width: '100%'}} 
                    onChange={handleDepartmentChange}
                  >
                    <MenuItem value={undefined}>-</MenuItem> 
                    {departments.map(department => (
                      <MenuItem value={department.name}>{department.name}</MenuItem>  
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='selectLocationLabel'>Standort</InputLabel>
                  <Select
                    labelId='selectLocationLabel'
                    value={projectFormData.location}
                    label="Standort"
                    size='small' 
                    sx={{ width: '100%'}} 
                    onChange={handleLocationChange}
                  >
                    <MenuItem value={undefined}>-</MenuItem> 
                    {locations.map(location => (
                      <MenuItem value={location.name}>{location.name}</MenuItem>  
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Kunde' 
                  size='small' 
                  value={projectFormData.customer}
                  sx={{ width: '100%'}} 
                  onChange={handleChange('customer')} 
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <DateTimePicker 
                  label='Startdatum' 
                  views={['day', 'month', 'year']} 
                  value={dayjs(projectFormData.start_date)}
                  slotProps={{ textField: { size: 'small' } }} 
                  sx={{ width: '100%'}} 
                  minDate={projectFormData.id ? dayjs(Date.now()).subtract(100, 'year') : dayjs(Date.now())}
                  onChange={(newValue) => setProjectFormData({ ...projectFormData, start_date: newValue?.format() })}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker 
                  label='Enddatum' 
                  views={['day', 'month', 'year']}
                  value={dayjs(projectFormData.end_date)}
                  slotProps={{ textField: { size: 'small' } }} 
                  sx={{ width: '100%'}} 
                  minDate={projectFormData.id ? dayjs(Date.now()).subtract(100, 'year') : dayjs(Date.now())}
                  onChange={(newValue) => setProjectFormData({ ...projectFormData, end_date: newValue?.format() })}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <Grid container spacing={4} sx={{ paddingY: 2 }}>
              <Grid item xs={6}>
                <Autocomplete 
                  options={users} 
                  value={projectFormData.project_lead_id ? users.find(user => user.id === projectFormData.project_lead_id) : (projectFormData.project_lead && users.find(user => user === projectFormData.project_lead)) || null}
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
                  value={projectFormData.sub_project_lead_id ? users.find(user => user.id === projectFormData.sub_project_lead_id) : (projectFormData.sub_project_lead && users.find(user => user === projectFormData.sub_project_lead)) || null}
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
              {!projectFormData.id ?
                <Grid item xs={12} sx={{ justifyContent: 'stretch' }}>
                  <Autocomplete 
                    getOptionKey={(option) => option ? option.id : ''}
                    multiple
                    options={users}
                    value={projectTeam.map((id) => users.find((user) => user.id === id))}
                    getOptionLabel={(option) => option ? 
                      option.firstname + ' ' + option.lastname 
                    :
                    ''}
                    loading={isLoadingUsers}
                    onChange={(event, value) => value ? 
                      setProjectTeam(value.map((item) => item && item.id ? item.id : "")) 
                    : 
                      setProjectTeam([])}
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
              : 
                <Grid item xs={12} sx={{ justifyContent: 'stretch' }}>
                  <Autocomplete 
                    getOptionKey={(option) => option && typeof option !== 'string' && option.id ? option.id : ''}
                    multiple
                    options={users}
                    value={
                      Array.isArray(projectFormData.team) 
                        ? projectFormData.team
                            .map((idOrUser) => typeof idOrUser === 'string' ? users.find((user) => user.id === idOrUser) : idOrUser)
                            .filter((item): item is User => item !== undefined)
                        : []
                    }
                    getOptionLabel={(option) => option && typeof option !== 'string' ? option.firstname + ' ' + option.lastname : ''}
                    loading={isLoadingUsers}
                    onChange={(event, value) => {setProjectFormData({...projectFormData,
                      team: value as Team[]
                    });
                    }}
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
              }
            </Grid>
          </TabPanel>
          <TabPanel value='3'>
          <ProjectRessourceTable 
            type='ressource_ressource' 
            project={projectFormData as Project}
            column_labels={['Monat', 'Bedarf', 'FTE']}
            dialog_heading={'Neue Personal Ressource'}
          />
          </TabPanel>
          <TabPanel value='4'>
          <ProjectRessourceTable 
            type='budget_ressource' 
            project={projectFormData as Project}
            column_labels={['Monat', 'Beschreibung', 'EUR']}
            dialog_heading={'Neue Budget Ressource'}
          />
          </TabPanel>
          <TabPanel value='5'>
          <ProjectRessourceTable 
            type='complexity_ressource' 
            project={projectFormData as Project}
            column_labels={['Beschreibung', 'Komplexitätsgrad']}
            dialog_heading={'Neuer Komplexitätsfaktor'}
          />
          </TabPanel>
          <TabPanel value='6'>
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
          <TabPanel value='7'>
            <MiscalaniousSection
              projectFormData={projectFormData}
              handleChange={handleChange}
              handleLinksChange={handleLinksChange}
            />
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' startIcon={< CloseIcon />} onClick={handleClose}>Abbrechen</Button>
        <LoadingButton variant='contained' startIcon={<SaveOutlinedIcon />} onClick={handleSave} autoFocus loading={isSavingProject}>Speichern</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog