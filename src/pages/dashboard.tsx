import Card from '@mui/material/Card'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import { LineChart } from '@mui/x-charts/LineChart'
import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUser, postUser } from '../services/user'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const DashboardPage = () => {
  const [user, setUser] = useState<User[]>([])

  useEffect(() => {
    getUser()
      .then(data => setUser(data))
  }, [])

  const handleInsertUser = () => {
    postUser({ firstname: 'Max', lastname: 'Mustermann' })
  }

  return (
    <StandardLayout>
      <h1>Dashboard</h1>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Button onClick={handleInsertUser}>Neuer User</Button>
            {user.map((item) => <Typography variant='body1'>{item.firstname} {item.lastname}</Typography>)}
          </Card>
        </Grid>
      </Grid>
    </StandardLayout>
  )
}

export default DashboardPage