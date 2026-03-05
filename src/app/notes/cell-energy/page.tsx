import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cell Energy: Photosynthesis & Respiration',
  description: 'Master the concepts of ATP, photosynthesis, and cellular respiration in this comprehensive study guide.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/yE51rTLi4yFyDq";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Cell Energy Notes"
      />
    </div>
  );
}
