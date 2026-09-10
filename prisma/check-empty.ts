import { prisma } from '../lib/db';

async function checkEmpty() {
  const clients = await prisma.client.count();
  const offers = await prisma.offer.count();
  const meetings = await prisma.meeting.count();
  const tasks = await prisma.taskItem.count();
  const followUps = await prisma.followUpItem.count();
  const updates = await prisma.clientUpdate.count();

  console.log('-------------------------------------------');
  console.log('🧹 LIVE SUPABASE DATABASE RECORD COUNTS:');
  console.log(` • Clients:        ${clients}`);
  console.log(` • Offers:         ${offers}`);
  console.log(` • Meetings:       ${meetings}`);
  console.log(` • Tasks:          ${tasks}`);
  console.log(` • Follow-ups:     ${followUps}`);
  console.log(` • Client Updates: ${updates}`);
  console.log('-------------------------------------------');
}

checkEmpty()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
