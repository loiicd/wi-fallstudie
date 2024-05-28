import { FunctionComponent, ReactNode, useContext } from 'react'
import { ProjectRole } from '../types/user'
import { UserContext } from '../context/userContext'

interface RoleProviderProps {
  roles: ProjectRole[]
  type: 'include' | 'exclude'
  children: ReactNode
}

const RoleProvider: FunctionComponent<RoleProviderProps> = ({ roles, type, children }) => {
  const { activeUser } = useContext(UserContext)

  if (type === 'include' && activeUser) {
    return roles.includes(activeUser!.type) ? (<>{children}</>) : null
  }

  if (type === 'exclude' && activeUser) { 
    return !roles.includes(activeUser!.type) ? (<>{children}</>) : null
  }

  return null
}

export default RoleProvider