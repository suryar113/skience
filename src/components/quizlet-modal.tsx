'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Layers, Repeat, ClipboardCheck } from 'lucide-react';

type QuizletMode = 'flashcards' | 'learn' | 'test' | 'match';

const modes: { name: QuizletMode; label: string; icon: React.ElementType }[] = [
  { name: 'flashcards', label: 'Flashcards', icon: Layers },
  { name: 'learn', label: 'Learn', icon: BookOpen },
  { name: 'test', label: 'Test', icon: ClipboardCheck },
  { name: 'match', label: 'Match', icon: Repeat },
];

export function QuizletModal({
  isOpen,
  onOpenChange,
  quizletSetId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  quizletSetId: string | null;
}) {
  const [selectedMode, setSelectedMode] = useState<QuizletMode | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset mode when closing
      setTimeout(() => setSelectedMode(null), 200);
    }
    onOpenChange(open);
  };

  const iframeUrl = quizletSetId && selectedMode
    ? `https://quizlet.com/${quizletSetId}/${selectedMode}/embed`
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-4">
            {selectedMode && (
              <Button variant="ghost" size="icon" onClick={() => setSelectedMode(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <DialogTitle className="text-2xl">Quizlet Study</DialogTitle>
          </div>
          <DialogDescription>
            {selectedMode ? `Mode: ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}` : 'Choose a study mode to begin.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 p-6 pt-0">
          {!selectedMode ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full content-center">
              {modes.map((mode) => (
                <Button
                  key={mode.name}
                  variant="outline"
                  className="h-32 text-lg flex flex-col gap-2"
                  onClick={() => setSelectedMode(mode.name)}
                >
                  <mode.icon className="w-8 h-8" />
                  {mode.label}
                </Button>
              ))}
            </div>
          ) : (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0 rounded-md"
              title={`Quizlet Embed - ${selectedMode}`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
