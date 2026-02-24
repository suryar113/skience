import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from 'nextjs-toploader';
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { FeedbackNudge } from "@/components/feedback-nudge";

export const metadata: Metadata = {
  title: "SKIENCE",
  description: "An interactive website for modern science notes.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="4P07Vz0gAuX8McY0xvnFrFDUxShRHFNpjCKRfMeJT1g" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning={true}>
        <NextTopLoader
          color="#7a00ff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #7a00ff,0 0 5px #7a00ff"
        />
        <FirebaseClientProvider>
          {children}
          <FeedbackNudge />
        </FirebaseClientProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
