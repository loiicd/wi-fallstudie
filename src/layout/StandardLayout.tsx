import Box from '@mui/material/Box'
import Header from '../components/Header'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectRole, User } from '../types/user'
import Cookies from 'js-cookie'
import PageHero from '../components/pageHero'

interface StandardLayoutProps {
  children: React.ReactNode
  heroTitle?: string
  heroActions?: ReactNode
  heroLoading?: boolean
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ children, heroTitle, heroActions, heroLoading }) => {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  const loginProvider = useCallback(() => {
    const userCookie = Cookies.get('user')
    if (!userCookie) {
      navigate('/login')
    } else {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole})
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
          {heroTitle ? <PageHero title={heroTitle} actions={heroActions} loading={heroLoading} /> : null}
          {children}
        </Container>
      </Box>
    </Box>
  ) : <div>Error</div>
}

export default StandardLayout