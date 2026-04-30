'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatbotPlaceholder = dynamic(
  () =>
    import('@/components/dashboard/chatbot-placeholder').then(
      (mod) => mod.ChatbotPlaceholder,
    ),
  {
    ssr: false,
    loading: () => null,
  },
);

export function ChatbotLoader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scheduleIdle =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) => window.setTimeout(callback, 1));
    const cancelIdle =
      window.cancelIdleCallback ??
      ((id: number) => window.clearTimeout(id));

    const idleId = scheduleIdle(() => setIsReady(true));

    return () => cancelIdle(idleId);
  }, []);

  return isReady ? <ChatbotPlaceholder /> : null;
}
