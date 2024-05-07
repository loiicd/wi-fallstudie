import List from '@mui/material/List'
import StandardLayout from '../layout/StandardLayout'
import { useCallback, useEffect, useState } from 'react'
import { User } from '../types/user'
import { deleteUser, getUser } from '../services/user'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import LinearProgress from '@mui/material/LinearProgress'

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)

  const handleDelete = useCallback((userId: string) => {
    deleteUser(userId)
      .then(() => alert('Nice'))
      .catch(error => alert(error))
  }, [])

  useEffect(() => {
    setIsLoadingUsers(true)
    getUser()
      .then(data => setUsers(data))
      .catch(error => alert(error))
      .finally(() => setIsLoadingUsers(false))
  }, [handleDelete])

  return (
    <StandardLayout>
      <h1>Members</h1>  
      {isLoadingUsers ? <LinearProgress sx={{ width: '30%' }} /> : null}
      <List sx={{ width: '30%' }}>
        {users ? users.map(user => (
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={user.firstname + ' ' + user.lastname} secondary={user.title} />
          </ListItem>
        )) : null}
      </List>
    </StandardLayout>
  )
}

export default UsersPage