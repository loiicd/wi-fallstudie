import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // const projekt = projekte.find((projekt) => projekt.id === id)

  useEffect(() => {
    if (!id) navigate('/notfound')
    // if (!projekt) navigate('/notfound')
  })

  return (  
    <StandardLayout>
      {/* <h1>{projekt?.name}</h1> */}
      <Grid container gap={4}>
        <Grid item xs={6}>
          <Card>
            
          </Card>
        </Grid>
      </Grid>
    </StandardLayout>
  )
}

export default ProjectPage