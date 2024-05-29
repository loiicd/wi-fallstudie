import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUsers } from '../services/user'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { User } from '../types/user'
import TextField from '@mui/material/TextField'
import { ApiResponse } from '../types/apiResponse'
import LinearProgress from '@mui/material/LinearProgress'
import { UserContext } from '../context/userContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { reloadUserContext } = useContext(UserContext)
  const [user, setUser] = useState<User | undefined>(undefined) 
  const [users, setUsers] = useState<ApiResponse<User[]>>({ state: 'loading' })
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [emailInputError, setEmailInputError] = useState<boolean>(false)
  const [disableSSO, setDisableSSO] = useState<boolean>(true)

  const login = async () => {
    if (user) {
      Cookies.set('user', `${user.id}|${user.firstname}|${user.lastname}|${user.email}|${user.type}`)
      reloadUserContext()
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    getUsers()
      .then(users => setUsers({ state: 'success', data: users }))
      .catch(error => setUsers({ state: 'error', message: error }))
  }, [])

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (users.state === 'success') {
      const emailInput = event.target.value
      setEmail(emailInput)
      const foundedUser = users.data.find(user => user.email === emailInput)
      if (foundedUser) {
        setUser(foundedUser)
        setDisableSSO(false)
        setEmailInputError(false)
      } else {
        setUser(undefined)
        setDisableSSO(true)
        setEmailInputError(true)
      }
    }
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
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component="h1" variant="h5">Anmelden</Typography>
      <Typography component="h1" variant="h6" color='gray'>Supernova Incoming Projects</Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField 
          value={email} 
          error={emailInputError || users.state === 'error'}
          disabled={users.state !== 'success'}
          variant='outlined' 
          label='E-Mail' 
          sx={{ width: '100%', mt: 3 }} 
          onChange={handleEmailInput} 
        />
        {users.state === 'loading' ? <LinearProgress /> : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={login}
          disabled={disableSSO}
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