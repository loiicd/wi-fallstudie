export type User = {
  id: string,
  firstname: string,
  lastname: string,
  title?: string,
  type: 'admin' | 'user',
}

export type UserFormData = Omit<User, 'id'>