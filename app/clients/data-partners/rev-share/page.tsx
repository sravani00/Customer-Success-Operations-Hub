'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RevShareDataPartnersPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/clients/data-partners');
  }, [router]);

  return null;
}
