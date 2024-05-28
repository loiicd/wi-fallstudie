import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FunctionComponent, useState } from 'react'
import { User } from '../types/user'
import Avatar from '@mui/material/Avatar'
import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import LogoutIcon from '@mui/icons-material/Logout'

interface UserDropDownProps {
  activeUser: User
}

const UserDropDown: FunctionComponent<UserDropDownProps> = ({ activeUser }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const logout = () => {
    Cookies.remove('user')
    navigate('/login')
  }
  
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar>{activeUser.firstname[0]}{activeUser.lastname[0]}</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <ListItemText>{activeUser.firstname} {activeUser.lastname}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>{activeUser.email}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>{activeUser.type}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          Abmelden
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserDropDown