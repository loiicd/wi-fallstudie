export type User = {
  id: string,
  firstname: string,
  lastname: string,
  title?: string,
  type: ProjectRole,
}

export type UserFormData = Omit<User, 'id'>

export type ProjectRole = 'projekteigner' | 'bewerter' | 'projektmanager' | 'administrator' | 'geschäftsleitung'