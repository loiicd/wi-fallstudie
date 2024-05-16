import { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { ProjectRole, User } from '../types/user'
import Cookies from 'js-cookie'

interface RoleProviderProps {
  roles: ProjectRole[]
  type: 'include' | 'exclude'
  children: ReactNode
}

const RoleProvider: FunctionComponent<RoleProviderProps> = ({ roles, type, children }) => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, title: undefined, type: type as ProjectRole })
    } 
  }, [])

  if (type === 'include' && activeUser) {
    return roles.includes(activeUser!.type) ? (
      <>{children}</>
    ) : null
  }

  if (type === 'exclude' && activeUser) { 
    return !roles.includes(activeUser!.type) ? (
      <>{children}</>
    ) : null
  }

  return null
}

export default RoleProvider