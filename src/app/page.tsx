import { SiteHeader } from '@/components/site-header';
import { HeroClient } from '@/components/hero-client';

/**
 * Landing page - Refactored to Server Component for improved TTFB.
 * Interactive elements are moved to HeroClient.
 */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Visual background decorative elements - GPU Accelerated */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none"></div>
      
      {/* Ambient Blobs */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:4s]"></div>

      <SiteHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6 relative z-10">
        <HeroClient />
      </main>
    </div>
  );
}
