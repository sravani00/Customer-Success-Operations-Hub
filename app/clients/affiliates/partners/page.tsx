'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PartnersAffiliateNetworksPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/clients/affiliates');
  }, [router]);

  return null;
}
