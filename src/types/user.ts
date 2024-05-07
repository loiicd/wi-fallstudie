export type User = {
  id: string,
  firstname: string,
  lastname: string,
  title?: string
}

export type UserFormData = Omit<User, 'id'>