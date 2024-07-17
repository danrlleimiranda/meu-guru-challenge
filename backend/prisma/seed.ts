import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: '4cd87666-578b-4200-b38f-c9797b39b38a',
        document: '000.000.000.13',
        email: 'rafa@prisma.io',
        name: 'Rafa',
        role: 'admin',
        password: bcrypt.hashSync('senhadificil'),
        phone: '(75) 9 8810-1718',
      },
      {
        id: '7ea87666-459c-4200-b38f-c0097b39b38a',
        document: '000.000.000.25',
        email: 'alice@prisma.io',
        name: 'Alice',
        role: 'user',
        password: bcrypt.hashSync('senhapoderosa'),
        phone: '(75) 9 9910-1314',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
