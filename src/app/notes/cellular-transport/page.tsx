import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cellular Transport: Osmosis & Diffusion',
  description: 'Learn about passive and active transport, including simple diffusion, osmosis, and protein pumps.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/FChuDvbuWVFkSs";

export default function NotesPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <iframe
        src={EMBED_URL}
        className="w-full h-full border-0"
        allowFullScreen
        title="Cellular Transport Notes"
      />
    </div>
  );
}
