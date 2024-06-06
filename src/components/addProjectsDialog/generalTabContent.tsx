import { TabPanel } from "@mui/lab";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Grid, TextField, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";
import { departments } from "../../types/department";
import { locations } from "../../types/location";
import { Project, ProjectFormData } from "../../types/project";


interface GeneralTabContentProps {
  projectFormData: ProjectFormData
  titleInputError: boolean;
  handleChange: (field: keyof ProjectFormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDepartmentChange: (e: SelectChangeEvent<string>) => void;
  handleLocationChange: (e: SelectChangeEvent<string>) => void;
  handleStatusChange: (e: SelectChangeEvent<string>) => void;
  setProjectFormData: (project: ProjectFormData) => void;
  tabPanelValue: string;
}

const GeneralTabContent: React.FC<GeneralTabContentProps> = ({
  tabPanelValue, projectFormData, titleInputError, handleChange, handleDepartmentChange, handleLocationChange, handleStatusChange, setProjectFormData
}) => {

  return (
    <TabPanel value={tabPanelValue}>
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
            onChange={(newValue: dayjs.Dayjs | null) => setProjectFormData({ ...projectFormData, start_date: newValue?.format() })}
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
            onChange={(newValue: dayjs.Dayjs | null) => setProjectFormData({ ...projectFormData, end_date: newValue?.format() })}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default GeneralTabContent;