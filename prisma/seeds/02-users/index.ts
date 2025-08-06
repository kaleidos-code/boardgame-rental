import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users.ts';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
}

async function run() {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default run;
