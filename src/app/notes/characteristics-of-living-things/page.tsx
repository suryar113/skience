'use client';

const EMBED_URL = "https://craft.me/s/asdasdasdasdas";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
