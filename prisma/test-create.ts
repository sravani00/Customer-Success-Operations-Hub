import { prisma } from '../lib/db';

async function testPost() {
  console.log('Testing create client with modal payload...');
  const payload = {
    name: 'Sample Partner',
    company: 'Sample Partner Corp',
    subModule: 'Data Partner',
    subModuleCategory: 'General',
    communicationMode: 'Email',
    status: 'Active',
    primaryContact: {
      name: 'Test Contact',
      email: 'test@samplepartner.com',
      phone: '+1 555-1234',
      role: 'Manager',
    },
    metricsSummary: 'Payment: Rev-Share • Vol: 50,000 / month',
    description: 'Test description',
    paymentType: 'Rev-Share',
    revenueFrequency: 'Monthly',
    dataType: 'Email Leads',
    estimatedVolume: '50,000 / month',
    revSharePercentage: 15,
  };

  const { primaryContact, ...clientData } = payload;
  const newClient = await prisma.client.create({
    data: {
      ...clientData,
      primaryContact: primaryContact
        ? {
            create: {
              name: primaryContact.name || '',
              email: primaryContact.email || '',
              phone: primaryContact.phone || '',
              role: primaryContact.role || '',
            },
          }
        : undefined,
    },
    include: {
      primaryContact: true,
    },
  });

  console.log('✅ Created client in Supabase DB:', newClient);
  const count = await prisma.client.count();
  console.log('📊 Total clients in Supabase DB:', count);
}

testPost()
  .catch((e) => {
    console.error('❌ Error during testPost:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
