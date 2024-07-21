import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: '4cd87664-578b-4200-b38f-c9797b39b38a',
        document: '321.840.000-13',
        email: 'rafa@prisma.io',
        name: 'Rafaela',
        role: 'admin',
        password: bcrypt.hashSync('senhadificil'),
        phone: '(75) 9 8810-1718',
      },
      {
        id: '7ea87661-459c-4200-b38f-c0097b39b38a',
        document: '320.100.080-25',
        email: 'alice@prisma.io',
        name: 'Alice',
        role: 'user',
        password: bcrypt.hashSync('senhapoderosa'),
        phone: '(75) 9 9910-1314',
      },
      {
        id: '7ea87667-459c-4211-b38f-c0097b87b54a',
        document: '123.456.789-25',
        email: 'eduardo@prisma.io',
        name: 'Eduardo Lemos',
        role: 'Admin',
        password: bcrypt.hashSync('meuguru'),
        phone: '(75) 9 9910-1314',
      },
      {
        id: '7ea87548-879c-4247-b38f-c0097b39b38a',
        document: '123.456.789-25',
        email: 'emille@gmail.io',
        name: 'Emille Vieira',
        role: 'user',
        password: bcrypt.hashSync('1234567'),
        phone: '(75) 9 9910-1314',
      },
      {
        id: '7ea87548-879c-8945-b38f-c0097b39b38a',
        document: '123.456.789-25',
        email: 'danmiranda@prisma.io',
        name: 'Danrllei Miranda',
        role: 'user',
        password: bcrypt.hashSync('meugurudeveloper'),
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
