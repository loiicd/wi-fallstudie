import { useNavigate, useParams } from 'react-router-dom'
import projekte from '../projekte.json'
import { useEffect } from 'react'
import Header from '../components/Header'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const projekt = projekte.find((projekt) => projekt.id === id)

  useEffect(() => {
    if (!id) navigate('/notfound')
    if (!projekt) navigate('/notfound')
  })

  return (
    <div>
      <Header />
      <h1>{projekt?.name}</h1>
    </div>
  )
}

export default ProjectPage