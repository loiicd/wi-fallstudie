import Box from '@mui/material/Box'
import Header from '../components/Header'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { FunctionComponent } from 'react'

interface StandardLayoutProps {
  children: React.ReactNode
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
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
  )
}

export default StandardLayout