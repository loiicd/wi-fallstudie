export type User = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  title?: string,
  type: ProjectRole,
}

export type UserFormData = Omit<User, 'id'>

export type ProjectRole = 'controller' | 'administrator' | 'geschäftsleitung' | 'projektleitung' | 'base'