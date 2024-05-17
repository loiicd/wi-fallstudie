import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUsers } from '../services/user'
import { useEffect, useState } from 'react'
import { User } from '../types/user'

const LoginPage = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | undefined>(undefined) 
  const [loadingUser, setLoadingUser] = useState<boolean>(true)

  useEffect(() => {
    setLoadingUser(true)
    getUsers()
      .then(data => {
        const zee = getRandomObjectFromArray(data)
        setUser(zee)
      })
      .catch(error => console.error(error))
      .finally(() => setLoadingUser(false))
  }, [])

  const login = async () => {
    if (user) {
      Cookies.set('user', `${user.id}|${user.firstname}|${user.lastname}|${user.type}`)
      navigate('/dashboard')
    }
    //   throw new Error('No user found')
    // }
  }

  function getRandomObjectFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        {/* <LockOutlinedIcon /> */}
      </Avatar>
      <Typography component="h1" variant="h5">Anmelden</Typography>
      <Typography component="h1" variant="h6" color='gray'>Supernova Incoming Projects</Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={login}
          disabled={loadingUser}
        >
          Anmelden mit SSO
        </Button>
        <Grid container spacing={1}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LoginPage