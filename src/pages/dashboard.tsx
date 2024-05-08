import StandardLayout from '../layout/StandardLayout'
import '../alien.css'

const DashboardPage = () => {
  return (
    <StandardLayout>
      <h1>Dashboard</h1>
      <div className="box-canvas">
        <div className="beam"></div>
        <div className="ship">
          <div className="ship-inner">
            <div className="alien-head">
            <div className="antennae"></div>
            <div className="mouth"></div>
          </div>
          </div>
        </div>
        <div className="bubble"></div>
      </div>
    </StandardLayout>
  )
}

export default DashboardPage