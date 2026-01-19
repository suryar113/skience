
'use client';

import { useState, useCallback, FormEvent, Dispatch, SetStateAction } from 'react';

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
    setMessages: setMessages as Dispatch<SetStateAction<Message[]>>,
    input,
    setInput,
    handleSubmit,
    isLoading,
  };
}
