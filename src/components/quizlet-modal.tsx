'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function QuizletModal({
  isOpen,
  onOpenChange,
  quizletSetId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  quizletSetId: string | null;
}) {
  const defaultMode = 'flashcards';
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    if (isOpen && quizletSetId) {
      const storedTheme = localStorage.getItem('theme') || 'dark';
      const baseUrl = `https://quizlet.com/${quizletSetId}/${defaultMode}/embed`;
      // Append `dark=true` query parameter if the app's theme is dark
      const finalUrl = storedTheme === 'dark' ? `${baseUrl}?dark=true` : baseUrl;
      setIframeUrl(finalUrl);
    } else {
        // Clear the URL when the modal is closed to ensure it reloads next time
        setIframeUrl('');
    }
  }, [isOpen, quizletSetId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">Quizlet Flashcards</DialogTitle>
          <DialogDescription>
            Study the terms for this topic. You can switch modes within the Quizlet window.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 p-6 pt-0">
          {quizletSetId && iframeUrl ? (
            <iframe
              key={iframeUrl} // Force re-mount if URL changes
              src={iframeUrl}
              className="w-full h-full border-0 rounded-md"
              title={`Quizlet Embed - ${defaultMode}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>{ quizletSetId ? 'Loading study set...' : 'No Quizlet set available for this topic.' }</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
