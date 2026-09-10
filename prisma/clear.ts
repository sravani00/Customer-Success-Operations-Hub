import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing all demo data from the database...');

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

  console.log('✨ All demo data successfully deleted from database!');
}

main()
  .catch((e) => {
    console.error('❌ Failed to clear database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
