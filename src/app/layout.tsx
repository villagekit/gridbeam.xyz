import type { Metadata } from "next";
import { Fredoka, Bitter } from "next/font/google";

import { Provider as ChakraProvider } from "@/components/ui/provider"
import { Layout } from '@/components/Layout'

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GridBeam.xyz",
  description: "Simple, adaptable, and sustainable - Grid Beam is a system for real-life world building, from furniture and robotics to vehicles and housing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fredoka.variable} ${bitter.variable}`}>
        <ChakraProvider>
          <Layout>
            {children}
          </Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}
