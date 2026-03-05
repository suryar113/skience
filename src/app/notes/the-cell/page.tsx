import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Cell: Structure & Organelles',
  description: 'Detailed study guide for cell organelles, prokaryotic vs eukaryotic cells, and plant vs animal cells.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/BWwKgb2BT5sgbZ";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="The Cell Notes"
      />
    </div>
  );
}
