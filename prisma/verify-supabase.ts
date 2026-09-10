import { prisma } from '../lib/db';

async function verifySupabaseConnection() {
  console.log('---------------------------------------------------------');
  console.log('🔍 SUPABASE POSTGRESQL LIVE CONNECTION VERIFICATION');
  console.log('---------------------------------------------------------');

  const startTime = Date.now();

  try {
    // 1. Connection Ping
    await prisma.$connect();
    const pingTime = Date.now() - startTime;
    console.log(`✅ 1. Database Connection: SUCCESSFUL (Ping: ${pingTime}ms)`);

    // 2. Count Records
    const clientCount = await prisma.client.count();
    const offerCount = await prisma.offer.count();
    const meetingCount = await prisma.meeting.count();
    const taskCount = await prisma.taskItem.count();
    const followUpCount = await prisma.followUpItem.count();
    const updateCount = await prisma.clientUpdate.count();

    console.log('\n📊 2. Live Database Record Counts:');
    console.log(`   • Clients:        ${clientCount}`);
    console.log(`   • Offers:         ${offerCount}`);
    console.log(`   • Meetings:       ${meetingCount}`);
    console.log(`   • Tasks:          ${taskCount}`);
    console.log(`   • Follow-ups:     ${followUpCount}`);
    console.log(`   • Updates:        ${updateCount}`);

    // 3. Test Full Insert -> Query -> Update -> Delete Cycle
    console.log('\n🔄 3. Testing Full CRUD Cycle on Supabase:');
    
    // CREATE
    const testClient = await prisma.client.create({
      data: {
        name: 'Verification Test Partner',
        company: 'Supabase Verification Corp',
        status: 'Active',
        subModule: 'Data Partner',
        paymentType: 'Rev-Share',
        revSharePercentage: 25,
        primaryContact: {
          create: {
            name: 'Verification Contact',
            email: 'verify@supabase.test',
            phone: '+1 555-0199',
            role: 'QA Director',
          },
        },
      },
      include: { primaryContact: true },
    });
    console.log(`   ✅ CREATE: Successfully inserted client ID ${testClient.id}`);

    // READ
    const fetchedClient = await prisma.client.findUnique({
      where: { id: testClient.id },
      include: { primaryContact: true },
    });
    if (fetchedClient && fetchedClient.name === 'Verification Test Partner') {
      console.log(`   ✅ READ: Successfully queried client ID ${fetchedClient.id} from Supabase`);
    } else {
      throw new Error('READ verification failed');
    }

    // UPDATE
    const updatedClient = await prisma.client.update({
      where: { id: testClient.id },
      data: { metricsSummary: 'Verified Status OK' },
    });
    if (updatedClient.metricsSummary === 'Verified Status OK') {
      console.log(`   ✅ UPDATE: Successfully updated metricsSummary in Supabase`);
    }

    // DELETE
    await prisma.client.delete({ where: { id: testClient.id } });
    console.log(`   ✅ DELETE: Successfully cleaned up test record from Supabase`);

    console.log('\n---------------------------------------------------------');
    console.log('🎉 ALL SUPABASE DATABASE CHECKS PASSED PERFECTLY!');
    console.log('---------------------------------------------------------');
  } catch (error) {
    console.error('❌ Supabase Verification Failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySupabaseConnection();
