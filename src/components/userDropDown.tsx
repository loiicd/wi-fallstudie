import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import Cookies from 'js-cookie'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'

interface UserDropDownProps {
  activeUser: User
}

const UserDropDown: FunctionComponent<UserDropDownProps> = ({ activeUser }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const upperCaseType = activeUser.type[0].toLocaleUpperCase() + activeUser.type.slice(1)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const logout = () => {
    Cookies.remove('user')
    navigate('/login')
  }
  
  return (
    <>
      <Button
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
          <ListItemText primary='E-Mail' secondary={activeUser.email} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary='Type' secondary={upperCaseType} />
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