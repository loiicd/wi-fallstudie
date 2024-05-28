import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import StandardLayout from '../layout/StandardLayout'
import ControllerOverview from '../components/dashboard/controllerOverview'
import BaseOverView from '../components/dashboard/baseOverview'
import BusinessViewOverview from '../components/dashboard/businessLeadOverview'

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