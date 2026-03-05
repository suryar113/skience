import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cell Division & Mitosis',
  description: 'Comprehensive notes on the cell cycle, mitosis, and meiosis. Understand how cells replicate and divide.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/zBqAP1zBPsOXHk";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Cell Division Notes"
      />
    </div>
  );
}
