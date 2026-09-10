import { prisma } from '../lib/db';

async function test() {
  console.log('Testing Supabase DB Connection...');
  const c = await prisma.client.create({
    data: {
      name: 'Supabase Test Client',
      company: 'Test Org',
      status: 'Active',
      subModule: 'Lead',
    },
  });
  console.log('✅ Successfully inserted record into Supabase:', c.id);

  const all = await prisma.client.findMany();
  console.log('📊 Total records in Supabase Client table:', all.length);

  await prisma.client.delete({ where: { id: c.id } });
  console.log('🧹 Cleaned up test record.');
}

test()
  .catch((e) => {
    console.error('❌ Database operation failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
