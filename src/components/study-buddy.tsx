
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, CornerDownLeft } from 'lucide-react';
import { askStudyBuddy } from '@/ai/flows/study-buddy-flow';
import type { StudyBuddyInput } from '@/ai/flows/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '@/hooks/use-chat';

export function StudyBuddy({
  topic,
  isOpen,
  onOpenChange,
}: {
  topic: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat<StudyBuddyInput>({
    flow: askStudyBuddy,
    initialMessages: [
        {
            role: 'model',
            content: `Hello! I'm your AI study buddy. We're currently looking at **${topic}**. Feel free to ask me any questions about it!`,
        },
    ],
    context: { topic },
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-[380px] h-[500px] bg-card rounded-2xl shadow-2xl flex flex-col border"
        >
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">Study Buddy</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5" />
            </Button>
          </header>

          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex items-start gap-3', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {m.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  <div className={cn(
                      'p-3 rounded-xl max-w-[80%] prose prose-sm',
                      m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                    <div dangerouslySetInnerHTML={{ __html: m.content as string }} />
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <footer className="p-4 border-t">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                ref={inputRef}
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="pr-20 min-h-[40px] max-h-40"
              />
              <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-1">
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
                <div className="text-xs text-muted-foreground hidden items-center gap-1 border rounded-md px-1.5 bg-muted md:flex">
                    <CornerDownLeft size={12}/>
                </div>
              </div>
            </form>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
