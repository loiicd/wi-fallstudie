import { useNavigate, useParams } from 'react-router-dom'
import projekte from '../projekte.json'
import { useEffect } from 'react'
import StandardLayout from '../layout/StandardLayout'

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const projekt = projekte.find((projekt) => projekt.id === id)

  useEffect(() => {
    if (!id) navigate('/notfound')
    if (!projekt) navigate('/notfound')
  })

  return (  
    <StandardLayout>
      <h1>{projekt?.name}</h1>
    </StandardLayout>
  )
}

export default ProjectPage