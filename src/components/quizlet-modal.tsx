'use client';

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

  const iframeUrl = quizletSetId
    ? `https://quizlet.com/${quizletSetId}/${defaultMode}/embed`
    : '';

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
          {quizletSetId ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0 rounded-md"
              title={`Quizlet Embed - ${defaultMode}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No Quizlet set available for this topic.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
