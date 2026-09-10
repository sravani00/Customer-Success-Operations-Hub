import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning database records...');

  await prisma.momPoint.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.followUpItem.deleteMany();
  await prisma.taskItem.deleteMany();
  await prisma.emailMessage.deleteMany();
  await prisma.clientUpdate.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.dataDocument.deleteMany();
  await prisma.dataLogSource.deleteMany();
  await prisma.dataRevenueRecord.deleteMany();
  await prisma.dataFeed.deleteMany();
  await prisma.primaryContact.deleteMany();
  await prisma.client.deleteMany();
  await prisma.appNotification.deleteMany();

  console.log('✅ Database is clean with 0 dummy records!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
