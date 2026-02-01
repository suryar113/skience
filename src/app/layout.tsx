import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "SKIENCE",
  description: "A modern website for science notes",
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
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
