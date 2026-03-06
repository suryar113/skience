import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedigrees: Tracking Traits Through Families',
  description: 'Learn how pedigree charts are used to trace genetic traits through generations and identify inheritance patterns.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/Hs8PbjOYoA6iJX";

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
