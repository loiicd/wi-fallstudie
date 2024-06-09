import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import StandardLayout from '../layout/StandardLayout'
import ControllerOverview from '../components/dashboardPage/controllerOverview'
import BaseOverView from '../components/dashboardPage/baseOverview'
import BusinessViewOverview from '../components/dashboardPage/businessLeadOverview'
import AdminOverview from '../components/dashboardPage/adminOverviews'

const DashboardPage = () => {
  const { activeUser } = useContext(UserContext)

  return (
    <StandardLayout heroTitle={`Willkommen zurück ${activeUser?.firstname}`}>
      <AdminOverview />
      <BusinessViewOverview />
      <BaseOverView />
      <ControllerOverview />
    </StandardLayout>
  )
}

export default DashboardPage