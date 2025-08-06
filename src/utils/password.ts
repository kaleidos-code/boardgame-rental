import { hash } from 'bcrypt'

export const bcryptPassword = async (password: string) => {
  return hash(password, 10)
}
