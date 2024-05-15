import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUsers } from '../services/user'

const LoginPage = () => {
  const navigate = useNavigate()

  const login = () => {
    getUsers()
      .then((data) => {
        const user = getRandomObjectFromArray(data)
        Cookies.set('user', `${user.id}|${user.firstname}|${user.lastname}|${user.type}`)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error(error)
        alert(error)
      })
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
        >
          Anmelden mit SSO
        </Button>
        <Grid container>
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