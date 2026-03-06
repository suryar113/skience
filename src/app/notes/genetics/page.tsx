import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Genetics: Inheritance and DNA',
    description: 'Learn how traits are passed from parents to offspring through genes, alleles, and patterns of inheritance.',
};

const EMBED_URL = "https://drinks-hunt-3eb.craft.me/qtNuhOQ1tK7X9q";

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
