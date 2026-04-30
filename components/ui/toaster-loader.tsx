'use client';

import dynamic from 'next/dynamic';

export const ToasterLoader = dynamic(
  () => import('@/components/ui/toaster').then((mod) => mod.Toaster),
  {
    ssr: false,
    loading: () => null,
  },
);
