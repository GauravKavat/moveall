'use client';

import { Bot, MessageCircle, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const mockMessages = [
  { id: '1', sender: 'bot', text: 'Hi, I am Assist Bot. I can help with shipment updates.' },
  { id: '2', sender: 'user', text: 'Show delayed shipments for today.' },
  { id: '3', sender: 'bot', text: 'Prototype mode: 12 delayed shipments found across 3 couriers.' },
];

export function ChatbotPlaceholder() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({ width: 360, height: 420 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 320;
  const MAX_WIDTH = typeof window !== 'undefined' ? Math.floor(window.innerWidth * 0.8) : 900;
  const MAX_HEIGHT = typeof window !== 'undefined' ? Math.floor(window.innerHeight * 0.75) : 800;

  const handleResizeStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return;

      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;

      const nextWidth = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, dragRef.current.startWidth - dx),
      );
      const nextHeight = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, dragRef.current.startHeight - dy),
      );

      setSize({ width: nextWidth, height: nextHeight });
    };

    const onMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <div
          className="relative mb-3 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          style={{ width: size.width, height: size.height, maxWidth: '80vw', maxHeight: '75vh' }}
        >
          <button
            type="button"
            onMouseDown={handleResizeStart}
            className="absolute left-0 top-0 z-10 h-5 w-5 cursor-nwse-resize rounded-br-md border-r border-b border-border bg-muted/70"
            aria-label="Resize chatbot"
            title="Drag to resize"
          />

          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-accent" />
              <p className="text-sm font-semibold">Operations Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-muted transition-colors"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                  message.sender === 'bot'
                    ? 'bg-muted text-foreground'
                    : 'ml-auto bg-primary text-primary-foreground'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => toast({ title: 'Chatbot roadmap', description: 'Live assistant workflow is under development.' })}
            >
              Chat coming soon (prototype)
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:h-12 sm:w-12"
        aria-label="Toggle chatbot"
        title="Open assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
