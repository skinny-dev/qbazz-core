const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      title: true,
      isApproved: true,
      socials: true,
    },
  });

  console.log('Stores:', JSON.stringify(stores, null, 2));

  await prisma.$disconnect();
}

main().catch(console.error);
