import Box from '@mui/material/Box'
import Header from '../components/Header'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import Cookies from 'js-cookie'

interface StandardLayoutProps {
  children: React.ReactNode
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  const loginProvider = useCallback(() => {
    const userCookie = Cookies.get('user')
    console.log(userCookie)
    if (!userCookie) {
      navigate('/login')
      console.log('Hello')
    } else {
      const [id, firstname, lastname, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, title: undefined, type: type as ('admin' | 'user')})
    }
  }, [navigate])

  useEffect(() => {
    loginProvider()
  }, [loginProvider])
  
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
  ) : <div>Error</div>
}

export default StandardLayout