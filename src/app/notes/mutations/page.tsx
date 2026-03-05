import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Genetic Mutations',
  description: 'An overview of point mutations, frameshift mutations, and chromosomal abnormalities like Down Syndrome.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/GalSPv8qTVLg0t";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Mutations Notes"
      />
    </div>
  );
}
