'use client';

import { useParams } from 'next/navigation';

export default function NotesPage() {
  const params = useParams();
  const blockId = params.blockId as string;
  const embedUrl = blockId ? `https://craft.me/s/${blockId}` : '';

  if (!embedUrl) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <p>No note to display.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
