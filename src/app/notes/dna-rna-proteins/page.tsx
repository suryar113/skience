import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DNA, RNA, & Protein Synthesis',
  description: 'The Central Dogma of biology: Learn how DNA is transcribed into RNA and translated into proteins.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/E3FmSQ8z98bsy6";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="DNA RNA Protein Notes"
      />
    </div>
  );
}
