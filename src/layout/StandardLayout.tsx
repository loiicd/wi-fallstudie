import Box from '@mui/material/Box'
import Header from '../components/Header'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import Cookies from 'js-cookie'

interface StandardLayoutProps {
  children: React.ReactNode
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => loginProvider)

  const loginProvider = () => {
    const userCookie = Cookies.get('user')
    if (!userCookie) {
      navigate('/login')
    } else {
      const [id, firstname, lastname, title, type] = userCookie.split('|')
      setActiveUser({ id: id, firstname, lastname, title, type: type as ('admin' | 'user')})
    }
  }
  
  return activeUser ? (
    <Box sx={{ display: 'flex' }}>
      <Header activeUser={activeUser} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  ) : null
}

export default StandardLayout