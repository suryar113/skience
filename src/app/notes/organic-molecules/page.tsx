import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organic Molecules & Biochemistry',
  description: 'A study guide for carbohydrates, lipids, proteins, and nucleic acids. Essential for biology and biochemistry students.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Organic Molecules Notes"
      />
    </div>
  );
}
