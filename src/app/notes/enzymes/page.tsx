import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enzymes: Biological Catalysts',
  description: 'Understand how enzymes lower activation energy and speed up chemical reactions in living organisms.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf";

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
