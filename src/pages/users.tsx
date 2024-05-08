import List from '@mui/material/List'
import StandardLayout from '../layout/StandardLayout'
import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUsers } from '../services/user'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import LinearProgress from '@mui/material/LinearProgress'

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingUsers(true)
    getUsers()
      .then(data => setUsers(data))
      .catch(error => alert(error))
      .finally(() => setIsLoadingUsers(false))
  }, [])

  return (
    <StandardLayout>
      <h1>Members</h1>  
      {isLoadingUsers ? <LinearProgress sx={{ width: '30%' }} /> : null}
      <List sx={{ width: '30%' }}>
        {users ? users.map(user => (
          <ListItem>
            <ListItemText primary={user.firstname + ' ' + user.lastname} secondary={user.title} />
          </ListItem>
        )) : null}
      </List>
    </StandardLayout>
  )
}

export default UsersPage