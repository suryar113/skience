
'use client';

import { useState, useCallback, useEffect, FormEvent } from 'react';

// Define the shape of a message
export interface Message {
  role: 'user' | 'model';
  content: string;
}

// Define the props for the useChat hook
export interface UseChatOptions<T, U> {
  flow: (input: T) => Promise<U>;
  initialMessages?: Message[];
  context?: Omit<T, 'message'>;
}

export function useChat<T extends { message: string }, U extends { response: string }>({
  flow,
  initialMessages = [],
  context = {} as Omit<T, 'message'>,
}: UseChatOptions<T, U>) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to update initial message if topic changes
  useEffect(() => {
    if (
      initialMessages.length > 0 &&
      context && 'topic' in context && typeof context.topic === 'string'
    ) {
      const newInitialMessage = {
        role: 'model' as const,
        content: `Hello! I'm your AI study buddy. We're currently looking at **${context.topic}**. Feel free to ask me any questions about it!`,
      };
      // Only update if the topic has actually changed to avoid re-writing on every render
      if (messages.length === 0 || (messages[0].role === 'model' && messages[0].content !== newInitialMessage.content)) {
        setMessages([newInitialMessage]);
      }
    }
  }, [context, initialMessages, messages]);


  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input) return;

      const userMessage: Message = { role: 'user', content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const flowInput = { ...context, message: input } as T;
        const response = await flow(flowInput);
        const modelMessage: Message = { role: 'model', content: response.response };
        setMessages((prev) => [...prev, modelMessage]);
      } catch (error) {
        console.error('Error calling flow:', error);
        const errorMessage: Message = {
          role: 'model',
          content: 'Sorry, I encountered an error. Please try again.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, context, flow]
  );

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
  };
}
