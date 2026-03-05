import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from 'nextjs-toploader';
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { FeedbackNudge } from "@/components/feedback-nudge";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const chunkyPuffly = localFont({
  src: '../../public/fonts/editundo.ttf', // Assuming path based on previous CSS
  variable: '--font-logo',
  display: 'swap',
});

const bebasNeue = localFont({
  src: '../../public/fonts/BebasNeue.ttf',
  variable: '--font-headline',
  display: 'swap',
});

const pixelifySans = localFont({
  src: '../../public/fonts/editundo.ttf',
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "SKIENCE | Interactive Biology Notes & Study Tools",
    template: "%s | SKIENCE"
  },
  description: "Explore interactive, high-tech biology notes. Featuring 3D visualizations, Quizlet integration, and comprehensive study guides for modern science students.",
  keywords: ["biology notes", "science education", "interactive learning", "study biology", "cell biology", "genetics", "biotechnology"],
  authors: [{ name: "SKIENCE Team" }],
  creator: "SKIENCE",
  metadataBase: new URL("https://skience.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skience.vercel.app",
    title: "SKIENCE | Interactive Biology Notes",
    description: "Modern, interactive biology notes with 3D visualizations and integrated study tools.",
    siteName: "SKIENCE",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKIENCE | Interactive Biology Notes",
    description: "Modern, interactive biology notes with 3D visualizations and integrated study tools.",
  },
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
      <body className={cn(
        "antialiased bg-background text-foreground",
        inter.variable,
        chunkyPuffly.variable,
        bebasNeue.variable,
        pixelifySans.variable
      )} suppressHydrationWarning={true}>
        <NextTopLoader
          color="#7a00ff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
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
