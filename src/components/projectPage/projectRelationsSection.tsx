import { useContext, useState } from 'react'
import { deleteProjectRelation } from '../../services/projectRelation'
import { useNavigate } from 'react-router'
import { UserContext } from '../../context/userContext'
import { Project, ProjectRelation } from '../../types/project'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StatusChip from '../statusChip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface RolesSectionProps {
  project: Project | undefined;
  openNewRelationDialog: boolean;
  setOpenNewRelationDialog: (value: boolean) => void;
  handleReloadProject: () => void
  loading: boolean
}

const RolesSection: React.FC<RolesSectionProps> = ({ project, openNewRelationDialog, setOpenNewRelationDialog, handleReloadProject, loading }) => {
  const navigate = useNavigate()
  const { activeUser } = useContext(UserContext)
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleDeleteProjectRelation = (relation_id: string) => {
    deleteProjectRelation(relation_id)
      .then(() => handleReloadProject())
  }

  return (
    <>
      <Accordion 
        disabled={activeUser?.type === 'base'}
        expanded={expanded}
        onChange={() => loading ? null : setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='action' />}
          sx={{ flexGrow: 1 }}
        >
          <Typography sx={{ fontSize: '1rem' }} color='text.secondary' gutterBottom>Verwandte Projekte ({loading ? '-' : project?.related_projects ? project.related_projects.length : '0'})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? null :
            <>
              <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1}}>
                <Grid item>
                  <Button startIcon={<AddIcon />} onClick={() => openNewRelationDialog ? setOpenNewRelationDialog(false) : setOpenNewRelationDialog(true)}>Neue Beziehung</Button>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {project?.related_projects?.map((related: ProjectRelation) => (
                  <Grid item xs={12}>
                    <Card>
                      <CardActionArea onClick={() => navigate(`/project/${related.project.id}`)}>
                        <CardContent>
                          <Grid direction={'row'} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Grid item xs={3}>
                              <Typography color='text.secondary'>{related.role.charAt(0).toUpperCase() + related.role.slice(1)}:</Typography>
                            </Grid> 
                            <Grid item xs={6}>
                              <Typography sx={{fontWeight: 'bold'}}>{related.project.title}</Typography>
                            </Grid> 
                            <Grid item xs={2}>
                              <StatusChip value={related.project.status} />
                            </Grid>
                            <Grid item xs={1}>
                              <Button title='Löschen' size='small' variant='text' startIcon={<DeleteOutlineOutlined />} onClick={() => handleDeleteProjectRelation(related.id)} />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          }
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default RolesSection