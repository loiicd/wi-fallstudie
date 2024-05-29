import { FunctionComponent, ReactNode, createContext, useEffect, useState } from 'react'
import { ProjectRole, User } from '../types/user'
import Cookies from 'js-cookie'

type UserContextType = {
  activeUser: User | undefined
  reloadUserContext: () => void
}

export const UserContext = createContext<UserContextType>({
  activeUser: undefined,
  reloadUserContext: () => {}
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

  useEffect(() => reloadUserContext(), [])

  const reloadUserContext = () => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const [id, firstname, lastname, email, type] = userCookie.split('|')
      setActiveUser({ id, firstname, lastname, email, title: undefined, type: type as ProjectRole })
    } 
  }

  return (
    <UserContext.Provider value={{ activeUser, reloadUserContext }}>
      {children}
    </UserContext.Provider>
  )
}