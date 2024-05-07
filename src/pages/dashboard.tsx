import Card from '@mui/material/Card'
import StandardLayout from '../layout/StandardLayout'
import Grid from '@mui/material/Grid'
import { LineChart } from '@mui/x-charts/LineChart'

const DashboardPage = () => {
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
          <Card></Card>
        </Grid>
      </Grid>
    </StandardLayout>
  )
}

export default DashboardPage