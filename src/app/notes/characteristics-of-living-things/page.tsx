import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Characteristics of Living Things',
  description: 'Learn about the core characteristics that define life, from cellular organization to homeostasis and evolution.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/asdasdasdasdas";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Characteristics of Living Things Notes"
      />
    </div>
  );
}
