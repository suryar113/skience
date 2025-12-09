'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { SiteHeader } from '@/components/site-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-rainbow" data-text={`Welcome, ${user.email}`}>
          Welcome, {user.email}
        </h2>
        <p className="text-lg text-muted-foreground">This is your dashboard. More features coming soon!</p>
      </main>
    </div>
  );
}
