import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environmental Influences on Traits',
  description: 'Explore how environmental factors can affect gene expression and influence the traits organisms display.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/EeEUSmJEU5sWzp";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Enzymes Notes"
      />
    </div>
  );
}
