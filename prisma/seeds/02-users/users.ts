import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

// Do not use for production

const USERS = [{
  id: 'fe4bb69b-722f-43b8-8248-9daac795dfa4',
  email: 'admin@example.com',
  password: 'admin',
  firstname: 'Admin',
  lastname: 'User',
  role: 'admin'
}, {
  id: 'db6025d9-547b-437d-80b7-0dae07504ab4',
  email: 'user@example.com',
  password: 'user',
  firstname: 'User',
  lastname: 'User',
  role: 'user'
}, {
  id: 'b63a2d32-f4f9-462e-b06f-2a5bb4aeb464',
  email: 'max@example.com',
  password: 'max',
  firstname: 'Max',
  lastname: 'Mustermann',
  role: 'user'
}]

export const seedUsers = async (prisma: PrismaClient) => {
  for (const user of USERS) {
    const { role, password, ...rest } = user

    const hashedPassword = await hash(password, 10)

    const roleModel = await prisma.role.findMany({
      where: {
        key: role
      }
    })

    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...rest,
        password: hashedPassword,
        roleId: roleModel[0].id
      },
      create: {
        ...rest,
        password: hashedPassword,
        roleId: roleModel[0].id
      }
    })
  }

  console.log('Users created')
}
