import { PrismaClient } from '@prisma/client'

const ROLES = [{
  id: '2e0c3a17-fbbf-4807-867b-d987255ba69e',
  key: 'admin',
  texts: [{
    key: 'name',
    lang: 'de',
    value: 'Admin'
  }]
}, {
  id: 'a9101d6b-0476-4a0d-888f-879251dd4dde',
  key: 'renter',
  name: 'Renter',
  texts: [{
    key: 'name',
    lang: 'de',
    value: 'Verleiher:in'
  }]
}, {
  id: 'ae23ff24-4023-4222-b1ca-be6b8c609292',
  key: 'user',
  texts: [{
    key: 'name',
    lang: 'de',
    value: 'Benutzer:in'
  }]
}]

export const seedRoles = async (prisma: PrismaClient) => {
  for (const role of ROLES) {
    const roleCreated = await prisma.role.upsert({
      where: {
        id: role.id,
        key: role.key
      },
      update: {},
      create: {
        id: role.id,
        key: role.key
      }
    })

    for (const text of role.texts) {
      await prisma.text.upsert({
        where: {
          key_lang_modelId_model: {
            lang: text.lang,
            model: 'Role',
            modelId: roleCreated.id,
            key: text.key
          }
        },
        update: {
          value: text.value
        },
        create: {
          key: text.key,
          model: 'Role',
          modelId: roleCreated.id,
          lang: text.lang,
          value: text.value
        }
      })
    }

    console.log('Role created:', roleCreated)
  }
}
