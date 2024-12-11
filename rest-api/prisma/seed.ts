import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  // admin
  await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      username: 'admin',
      full_name: 'admin',
      password: await bcrypt.hash('admin', 6),
      refreshToken: '',
      role: 'admin',
    },
  });

  // employee
  await prisma.user.upsert({
    where: { user_id: 2 },
    update: {},
    create: {
      username: 'employee',
      full_name: 'employee',
      password: await bcrypt.hash('employee', 6),
      refreshToken: '',
      role: 'employee',
    },
  });

  // user
  await prisma.user.upsert({
    where: { user_id: 3 },
    update: {},
    create: {
      username: 'user',
      full_name: 'user',
      password: await bcrypt.hash('user', 6),
      refreshToken: '',
      role: 'user',
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
