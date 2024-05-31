import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import StandardLayout from '../layout/StandardLayout'
import ControllerOverview from '../components/dashboardPage/controllerOverview'
import BaseOverView from '../components/dashboardPage/baseOverview'
import BusinessViewOverview from '../components/dashboardPage/businessLeadOverview'
import { Button, Typography } from '@mui/material'
import { createProject_Project_Relation_Table } from '../services/projectRelation'

const DashboardPage = () => {
  const { activeUser } = useContext(UserContext)

  return (
    <StandardLayout heroTitle={`Willkommen zurück ${activeUser?.firstname}`}>
      <BusinessViewOverview />
      <BaseOverView />
      <ControllerOverview />
    </StandardLayout>
  )
}

export default DashboardPage