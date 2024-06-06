import { ChangeEvent, FunctionComponent } from "react";
import { ProjectFormData } from "../../types/project";
import { Stack, TextField } from "@mui/material";


interface MiscalaniousSectionProps {
  projectFormData: ProjectFormData;
  handleChange: (field: keyof ProjectFormData) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleLinksChange: (type: string) => (event: ChangeEvent<HTMLInputElement>) => void;
}



const MiscalaniousSection: FunctionComponent<MiscalaniousSectionProps> = ({ projectFormData, handleChange, handleLinksChange}) => {
  return (
    <>
      <Stack spacing={2}>
        <TextField 
          label='Stakeholder' 
          size='small' 
          value={projectFormData.stakeholder}
          sx={{ width: '100%'}} 
          multiline 
          rows={4} 
          onChange={handleChange('stakeholder')} 
        />
        <TextField 
          label='Abhängigkeiten' 
          size='small' 
          value={projectFormData.dependencies}
          sx={{ width: '100%'}} 
          multiline 
          rows={4} 
          onChange={handleChange('dependencies')} 
        />
        <TextField 
          label='Erwartete Effekte' 
          size='small' 
          value={projectFormData.expected_effects}
          sx={{ width: '100%'}} 
          multiline 
          rows={4} 
          onChange={handleChange('expected_effects')} 
        />

        <TextField 
          label='Confluence Space' 
          size='small' 
          value={projectFormData.links?.find(link => link.type === 'confluence')?.url || ''}
          sx={{ width: '100%'}}
          onChange={handleLinksChange('confluence')}
        />

        <TextField 
          label='Jira Board' 
          size='small' 
          value={projectFormData.links?.find(link => link.type === 'jira')?.url || ''}
          sx={{ width: '100%'}}
          onChange={handleLinksChange('jira')}
        />
        <TextField 
          label='Weiterer Link...' 
          size='small' 
          value={projectFormData.links?.find(link => link.type === 'other')?.url || ''}
          sx={{ width: '100%'}}
          onChange={handleLinksChange('other')}
        />
      </Stack>
    </>
  )
}

export default MiscalaniousSection

