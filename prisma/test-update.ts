import { prisma } from '../lib/db';

async function testUpdate() {
  console.log('Testing client update in Supabase...');

  // 1. Get an existing client
  const client = await prisma.client.findFirst({
    include: { primaryContact: true },
  });

  if (!client) {
    console.log('No client found to test update!');
    return;
  }

  console.log('Original client in Supabase:', client.id, client.name, client.company);

  // 2. Perform update
  const updated = await prisma.client.update({
    where: { id: client.id },
    data: {
      name: `${client.name} (Updated)`,
      company: `${client.company} (Updated)`,
      metricsSummary: 'Updated via Test Script',
    },
    include: { primaryContact: true },
  });

  console.log('✅ Updated client in Supabase DB:', updated.id, updated.name, updated.company);

  // 3. Re-query from DB to double check persistence
  const check = await prisma.client.findUnique({
    where: { id: client.id },
  });
  console.log('🔍 Verified re-queried client from Supabase:', check?.name, check?.company);
}

testUpdate()
  .catch((e) => {
    console.error('❌ Error during testUpdate:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
