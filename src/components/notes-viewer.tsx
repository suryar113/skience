
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NotesViewerProps {
  url: string | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function NotesViewer({ url, onOpenChange }: NotesViewerProps) {
  const isOpen = !!url;
  
  // To embed Craft docs, we need to get the block ID from the URL.
  // e.g., https://drinks-hunt-3eb.craft.me/asdasdasdasdas -> asdasdasdasdas
  const blockId = url?.substring(url.lastIndexOf('/') + 1);

  // Then construct the embeddable URL.
  const embedUrl = url ? `https://craft.me/s/${blockId}` : '';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Notes</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden px-2 pb-2">
          {embedUrl && (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 rounded-md"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
